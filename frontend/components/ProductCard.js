import Link from 'next/link';
import { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product._id, 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-64 bg-gray-200 cursor-pointer overflow-hidden">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg hover:text-purple-600 transition cursor-pointer mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.numReviews})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            className="btn-primary btn-sm disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : <FaShoppingCart />}
          </button>
        </div>
      </div>
    </div>
  );
}
