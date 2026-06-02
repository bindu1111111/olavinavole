import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store';
import { useCartStore } from '../store';
import Link from 'next/link';
import { FaUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

export default function Profile() {
  const router = useRouter();
  const { user, token, logout, getProfile } = useAuthStore();
  const { cart, getCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load profile and cart
      if (token) {
        await getCart(token);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) return <Layout><div className="container py-12 text-center">Loading...</div></Layout>;

  return (
    <Layout title="My Profile">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                    activeTab === 'profile'
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUser /> Profile
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                    activeTab === 'orders'
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FaShoppingBag /> Orders
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded hover:bg-red-50 text-red-600 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8">Profile Information</h1>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">First Name</p>
                    <p className="text-lg font-semibold">{user?.firstName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Last Name</p>
                    <p className="text-lg font-semibold">{user?.lastName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Email</p>
                    <p className="text-lg font-semibold">{user?.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Phone</p>
                    <p className="text-lg font-semibold">{user?.phone || 'Not set'}</p>
                  </div>
                </div>

                {user?.address && (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Address</h2>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Street</p>
                        <p className="text-lg font-semibold">{user.address.street || 'Not set'}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">City</p>
                        <p className="text-lg font-semibold">{user.address.city || 'Not set'}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">State</p>
                        <p className="text-lg font-semibold">{user.address.state || 'Not set'}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Postal Code</p>
                        <p className="text-lg font-semibold">{user.address.postalCode || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">View your order history</p>
                  <Link href="/orders" className="btn-primary">
                    View All Orders
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
