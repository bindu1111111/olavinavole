import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useAuthStore, useCartStore } from '../store';
import Link from 'next/link';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

export default function Cart() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { cart, getCart, removeFromCart, updateCartItem } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      loadCart();
    }
  }, [token]);

  const loadCart = async () => {
    try {
      setLoading(true);
      await getCart(token);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(token, productId);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      try {
        await updateCartItem(token, productId, quantity);
      } catch (error) {
        alert('Failed to update cart');
      }
    }
  };

  if (loading) return <Layout><div className="container py-12 text-center">Loading cart...</div></Layout>;

  return (
    <Layout title="Shopping Cart">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {!cart?.items || cart.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="bg-white p-6 rounded-lg shadow flex gap-4">
                    <img
                      src={item.product.images?.[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">${item.product.price}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cart.totalPrice?.toFixed(2) || '0.00'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{cart.totalPrice > 100 ? 'FREE' : '$10.00'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">${(cart.totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">
                    ${((cart.totalPrice || 0) + (cart.totalPrice > 100 ? 0 : 10) + (cart.totalPrice * 0.1)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                Proceed to Checkout <FaArrowRight />
              </Link>

              <Link href="/" className="btn-secondary w-full mt-3 text-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
