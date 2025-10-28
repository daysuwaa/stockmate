"use client"
import { Box, ClipboardList, Home, LogOut, Settings, Menu, X, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import Logo from '../common/Logo';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
    const router = useRouter();
  
  const sidebarLinks = [
    { label: 'Dashboard', href: '/routes/dashboard', icon: <Home size={20}/> },
    { label: 'Inventory', href: '/routes/inventory', icon: <Box size={20}/> },
    { label: 'Stock Alerts', href: '/routes/stock-alert', icon: <ClipboardList size={20}/> },
    { label: 'Add Products', href: '/routes/add-product', icon: <Plus size={20}/> },
    // { label: 'Customers', href: '/routes/customers', icon: <Users size={20}/> },
    { label: 'Settings', href: '/routes/settings', icon: <Settings size={20}/> },
  ];
  const isActive = (href: string) => pathname === href
  const handleLogout = () => {
    // 1. Clear auth tokens/session
    localStorage.removeItem("authToken"); // if you're storing a token
    sessionStorage.clear(); // optional

    // 2. Redirect user
    router.push("/auth/login");
    toast.success('User logged out')
  };
  return (
    <>
    <div className='mb-8 top-0 z-2 fixed lg:hidden '>
       
      <Logo/>
    

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 right-4 p-2 bg-rose-100 rounded-lg shadow-md hover:bg-rose-200 transition-colors duration-200'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className='lg:hidden fixed inset-0  bg-opacity-50 '
          onClick={() => setIsOpen(false)}
        />
      )}
        </div>

      {/* Sidebar */}
      <div className={`
        fixed left-0 bg-gradient-to-b from-rose-50 to-rose-100 h-screen shadow-lg px-6 py-6 border-r border-rose-200 z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 w-3xs
      `}>
      {/* Header */}
     <div className='lg:block'>
          <Logo/>
        </div>

        {/* Navigation Links */}
        <nav className='space-y-2 mt-16 lg:mt-0'>
          {sidebarLinks.map((link, index) => (
            <Link key={index} href={link.href} onClick={() => setIsOpen(false)}>
              <div className={`
                group flex items-center mt-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                ${isActive(link.href) 
                  ? 'bg-rose-200 text-rose-800 shadow-sm border-l-4 border-rose-500' 
                  : 'text-slate-700 hover:bg-rose-200 hover:text-rose-800 hover:shadow-sm'
                }
              `}>
                <div className={`
                  mr-3 transition-transform duration-200
                  ${isActive(link.href) ? 'scale-110' : 'group-hover:scale-110'}
                `}>
                  {link.icon}
                </div>
                <span className='font-medium text-sm'>{link.label}</span>
              </div>
            </Link>
          ))}
        </nav>

      {/* Logout Button */}
      <div className='absolute bottom-6 left-6 right-6'>
        <button onClick={handleLogout} className='flex items-center w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group'>
          <LogOut size={20} className='mr-3 group-hover:scale-110 transition-transform duration-200'/>
          <span className='font-medium text-sm'>Logout</span>
        </button>
      </div>
    </div>
    </>
  )
}

export default Sidebar;