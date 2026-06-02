import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { productAPI } from '../utils/api';
import { useCartStore, useAuthStore } from '../store';
import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuthStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getById(id);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await addToCart(token, product._id, quantity, {});
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  if (loading) return <Layout><div className="container py-12 text-center">Loading...</div></Layout>;

  if (!product) return <Layout><div className="container py-12 text-center">Product not found</div></Layout>;

  return (
    <Layout title={`${product.name} - Earrings Store`}>
      <div className="container py-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-purple-600 mb-8 hover:text-purple-700">
          <FaArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex flex-col">
            <img
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((img, idx) => (
                <img key={idx} src={img} alt={`View ${idx}`} className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-gray-600">({product.numReviews} reviews)</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded">
              <div>
                <p className="text-sm text-gray-600">Material</p>
                <p className="font-semibold capitalize">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Color</p>
                <p className="font-semibold capitalize">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold capitalize">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock</p>
                <p className="font-semibold">{product.stock} available</p>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-purple-600">${product.price}</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-none"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            {product.stock === 0 && (
              <div className="p-4 bg-red-100 text-red-700 rounded">
                Out of stock
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          {product.reviews?.length === 0 ? (
            <p className="text-gray-600">No reviews yet</p>
          ) : (
            <div className="space-y-6">
              {product.reviews?.map((review, idx) => (
                <div key={idx} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
