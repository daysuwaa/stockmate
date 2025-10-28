"use client"
import React from 'react';
import { Box} from 'lucide-react';

const Header = () => {

  return (
    <div className='mt-20 lg:mt-0 bg-white px-6 py-7'>
      <div className='flex items-center justify-between'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-purple-500 flex items-center">
              <span className='mr-2'><Box /></span>Inventory Management
            </h1>
            <p className="text-slate-500 mt-1">Manage your product inventory efficiently</p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Header;