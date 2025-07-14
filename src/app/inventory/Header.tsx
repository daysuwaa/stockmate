"use client"
import React from 'react';
import { Box, Download, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { inventoryData } from './inventorydata'; 
import {exportToExcel} from "./Export"

const Header = () => {
  const router = useRouter();

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
        <div className="flex gap-3 ml-auto">
          <button
            className="flex items-center border gap-2 cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            onClick={() => exportToExcel(inventoryData)}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => router.push('/add-product')}
            className="flex items-center gap-2 bg-purple-200 cursor-pointer text-black hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;