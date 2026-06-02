const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, billingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Check stock
    for (let item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`,
        });
      }
    }

    const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shippingCost = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shippingCost + tax;

    const order = new Order({
      orderNumber: generateOrderNumber(),
      user: req.user.id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        customization: item.customization,
      })),
      shippingAddress,
      billingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      timeline: [
        {
          status: 'pending',
          message: 'Order placed successfully',
        },
      ],
    });

    // Handle Stripe payment if selected
    if (paymentMethod === 'stripe') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(total * 100),
          currency: 'usd',
          metadata: {
            orderId: order._id,
            userId: req.user.id,
          },
        });

        order.stripePaymentIntentId = paymentIntent.id;
      } catch (stripeError) {
        return res.status(400).json({ message: 'Payment processing failed', error: stripeError.message });
      }
    }

    // Reduce stock
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    await order.save();

    // Clear cart
    await Cart.updateOne({ user: req.user.id }, { items: [], totalItems: 0, totalPrice: 0 });

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');

    res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product').populate('user', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, message } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    order.timeline.push({
      status,
      message: message || `Order status updated to ${status}`,
    });

    await order.save();

    res.json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'completed',
          orderStatus: 'processing',
          $push: {
            timeline: {
              status: 'processing',
              message: 'Payment confirmed, processing order',
            },
          },
        },
        { new: true }
      );

      return res.json({
        message: 'Payment confirmed',
        order,
      });
    } else {
      return res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ message: `Cannot cancel order with status: ${order.orderStatus}` });
    }

    order.orderStatus = 'cancelled';
    order.timeline.push({
      status: 'cancelled',
      message: 'Order cancelled by user',
    });

    // Restore stock
    for (let item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    await order.save();

    res.json({
      message: 'Order cancelled',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
