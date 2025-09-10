'use client';
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">StockMate</h2>
          <p className="text-sm mt-2">
            Simple inventory tracking for small businesses.  
            Stay stocked, stay stress-free.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#hero" className="hover:text-pink-600">Home</Link></li>
            <li><Link href="#features" className="hover:text-pink-600">Features</Link></li>
            <li><Link href="#use-cases" className="hover:text-pink-600">Use Cases</Link></li>
            <li><Link href="#testimonials" className="hover:text-pink-600">Testimonials</Link></li>
            <li><Link href="/auth/register" className="hover:text-pink-600">Get Started</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-gray-600">
            <a href="#" className="hover:text-pink-600"><Instagram size={20} /></a>
            <a href="#" className="hover:text-pink-600"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-600"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-600"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StockMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;