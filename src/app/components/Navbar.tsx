'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Logo from './Logo';


const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white flex items-center justify-between  z-50 p-4 ">
      {/* Logo */}
      <Logo/>

      {/* Desktop Nav */}
      <ul className="lg:flex gap-7 text-gray-700 hidden">
        <li><Link href="#hero" className='hover:border-b-4 hover:border-pink-400 cursor-pointer'>Home</Link></li>
        <li><Link href="#features" className='hover:border-b-4 hover:border-pink-400 cursor-pointer' >Features</Link></li>
        <li><Link href="#use-cases" className='hover:border-b-4 hover:border-pink-400 cursor-pointer' >Use Cases</Link></li>
        <li><Link href="#demo" className='hover:border-b-4 hover:border-pink-400 cursor-pointer' >Demo</Link></li>
      </ul>

      {/* Desktop Auth */}
      <div className="lg:flex hidden items-center gap-4">
        <button
          onClick={() => router.push('/auth/login')}
          className="text-sm border border-gray-400 py-2 px-6 rounded text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/auth/register')}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-pink-400 text-sm cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <Menu
        onClick={() => setIsOpen(true)}
        className="lg:hidden cursor-pointer"
      />

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white py-8 px-2  z-50 flex flex-col gap-6">
          <div className="flex justify-between items-center  ">
            <Logo/>
            <X
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <ul className="flex flex-col  gap-4 text-center text-gray-700 underline">
            <li><Link href="#hero" onClick={() => setIsOpen(false)} className=''>Home</Link></li>
            <li><Link href="#features" onClick={() => setIsOpen(false)}>Features</Link></li>
            <li><Link href="#use-cases" onClick={() => setIsOpen(false)}>Use Cases</Link></li>
            <li><Link href="#demo" onClick={() => setIsOpen(false)}>Demo</Link></li>
            <li>
              <button
                onClick={() => {
                  router.push('/auth/login');
                  setIsOpen(false);
                }}
               className="text-sm border border-gray-400 py-2 px-6 rounded text-gray-600 hover:bg-gray-50 w-full"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push('/auth/signup');
                  setIsOpen(false);
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-green-700 text-sm w-full"
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;