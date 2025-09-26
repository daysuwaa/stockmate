"use client"
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Header = () => {
  return (
    <div className='mt-20 lg:mt-0 bg-white px-6 py-7'>
      <div className='flex items-center justify-between'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-500 flex items-center">
              <span className='mr-2'><AlertTriangle /></span>Stock Alert
            </h1>
            <p className="text-slate-500 mt-1">Keep track of internal notifications (low stock, out of stock).</p>
             <p className="text-gray-600 mt-1">
              Note:Items with 10 or fewer units in stock
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Header;