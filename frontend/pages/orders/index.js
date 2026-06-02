import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store';
import { orderAPI } from '../utils/api';
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function Orders() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      loadOrders();
    }
  }, [token]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getAll();
      setOrders(data.orders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock className="text-yellow-500" />,
      processing: <FaBox className="text-blue-500" />,
      shipped: <FaTruck className="text-purple-500" />,
      delivered: <FaCheckCircle className="text-green-500" />,
      cancelled: <FaCheckCircle className="text-red-500" />,
    };
    return icons[status] || <FaClock />;
  };

  if (loading) return <Layout><div className="container py-12 text-center">Loading orders...</div></Layout>;

  return (
    <Layout title="My Orders">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Order Tracking</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-xl text-gray-600">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => router.push(`/orders/${order._id}`)}
                className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold text-purple-600">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <div className="flex items-center gap-2 font-semibold capitalize">
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="flex items-center gap-2 mt-4">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status, idx) => (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.orderStatus) >= idx
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      {idx < 3 && (
                        <div
                          className={`h-1 w-8 mx-1 ${
                            ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.orderStatus) > idx
                              ? 'bg-purple-600'
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                {order.trackingNumber && (
                  <p className="text-sm text-gray-600 mt-4">Tracking: {order.trackingNumber}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
