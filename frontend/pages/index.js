import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useCartStore, useAuthStore } from '../store';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { addToCart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll(filters);
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await addToCart(token, productId, quantity, {});
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  return (
    <Layout title="Shop - Earrings Store">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Earrings Collection</h1>
          <p className="text-xl mb-8">Discover exquisite handcrafted earrings designed just for you</p>
          <button onClick={() => document.getElementById('products').scrollIntoView()} className="btn-primary bg-white text-purple-600">
            Shop Now
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All Categories</option>
                <option value="studs">Studs</option>
                <option value="hoops">Hoops</option>
                <option value="drops">Drops</option>
                <option value="chandeliers">Chandeliers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Price</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="0"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="1000"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '' })}
                className="btn-secondary w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Collection</h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold text-lg mb-2">Secure Checkout</h3>
              <p className="text-gray-600">SSL encrypted transactions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-bold text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium materials only</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
