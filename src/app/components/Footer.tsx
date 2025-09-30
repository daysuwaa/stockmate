'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">StockMate</h2>
          <p className="text-sm mt-2 leading-relaxed">
            Simple and reliable inventory tracking designed for small businesses.  
            Stay organized, save time, and keep your shelves stocked.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#hero" className="hover:text-pink-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-pink-600 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#use-cases" className="hover:text-pink-600 transition-colors">
                Use Cases
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-pink-600 transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-pink-600 transition-colors">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} StockMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;