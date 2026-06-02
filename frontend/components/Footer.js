import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              Handcrafted earrings designed with love and quality materials. Express yourself with our unique collections.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:support@earrings.com" className="hover:text-white transition">support@earrings.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a></li>
              <li>Shipping & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-pink-500 transition"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaEnvelope size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Earrings Store. All rights reserved. | Secure & SSL Protected</p>
        </div>
      </div>
    </footer>
  );
}
