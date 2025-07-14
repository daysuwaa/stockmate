"use client"
import React from 'react';
import { PlusIcon } from 'lucide-react';

const Header = () => {
  return (
    <div className='mt-20 lg:mt-0 bg-white px-6 py-7'>
      <div className='flex items-center justify-between'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700 flex items-center">
              <span className='mr-2'><PlusIcon /></span>Add Products
            </h1>
            <p className="text-slate-500 mt-1">Add new products to your inventory</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Header;