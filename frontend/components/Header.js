import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store';
import { FaShoppingCart, FaUser, FaMenu, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Earrings
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-purple-600 transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-purple-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative hover:text-purple-600 transition">
            <FaShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {token ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/profile" className="hover:text-purple-600 transition">
                <FaUser size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login" className="btn-secondary btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t py-4 px-4">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-purple-600">Shop</Link>
            <Link href="/about" className="hover:text-purple-600">About</Link>
            <Link href="/contact" className="hover:text-purple-600">Contact</Link>
            {token ? (
              <>
                <Link href="/profile" className="hover:text-purple-600">Profile</Link>
                <button onClick={handleLogout} className="btn-primary text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary">Login</Link>
                <Link href="/register" className="btn-primary">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
