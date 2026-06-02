import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../store';
import { orderAPI } from '../../utils/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (id) {
      loadOrder();
    }
  }, [id, token]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getById(id);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div className="container py-12 text-center">Loading order...</div></Layout>;

  if (!order) return <Layout><div className="container py-12 text-center">Order not found</div></Layout>;

  return (
    <Layout title={`Order ${order.orderNumber}`}>
      <div className="container py-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-purple-600 mb-8 hover:text-purple-700">
          <FaArrowLeft /> Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Order Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{order.orderNumber}</h1>
                <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Total</p>
                <p className="text-3xl font-bold text-purple-600">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Status */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Order Status</h2>
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg capitalize">
                  <p className="font-bold text-lg">{order.orderStatus}</p>
                  <p className="text-sm opacity-90">Payment: {order.paymentStatus}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded">
                      <img
                        src={item.product.images?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 text-sm">${item.price} each</p>
                      </div>
                      <div className="text-right font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Order Timeline</h2>
                <div className="space-y-4">
                  {order.timeline?.map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                        {idx < order.timeline.length - 1 && <div className="h-12 border-l-2 border-purple-600"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="font-semibold capitalize">{event.status}</p>
                        <p className="text-sm text-gray-600">{event.message}</p>
                        <p className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.trackingNumber && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-600">Tracking Number: <span className="font-bold">{order.trackingNumber}</span></p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Shipping Address */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}<br />
                  {order.shippingAddress.phone}
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-4">Price Details</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${order.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 font-bold flex justify-between">
                    <span>Total</span>
                    <span className="text-purple-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
