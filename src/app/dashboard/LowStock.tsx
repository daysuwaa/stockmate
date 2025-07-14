"use client";
import { AlertTriangle, Ban, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

type LowStockComponentProps = {
  productName: string;
  quantity: number;
  lastUpdate: Date;
  status: StatusType;
};

// ✅ Map status to Tailwind classes
const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Out of Stock':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// ✅ Map status to icons
const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case 'In Stock':
      return <CheckCircle className="text-green-600 w-5 h-5" />;
    case 'Low Stock':
      return <AlertTriangle className="text-yellow-600 w-5 h-5" />;
    case 'Out of Stock':
      return <Ban className="text-red-600 w-5 h-5" />;
    default:
      return null;
  }
};

const LowStockComponent = ({ productName, quantity, lastUpdate, status }: LowStockComponentProps) => {
  const borderColorClass = {
    'In Stock': 'border-green-500',
    'Low Stock': 'border-yellow-500',
    'Out of Stock': 'border-red-500'
  }[status];

  return (
    <div className={`p-7 bg-white border-l-4 ${borderColorClass} rounded-lg shadow-md min-w-[400px]`}>
      <div className="flex items-center justify-between mb-2">
        {getStatusIcon(status)}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <h3 className="font-medium text-gray-800">{productName}</h3>
      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      <div className="text-xs text-gray-400 mt-2">
        Last updated: {lastUpdate.toLocaleDateString()}
      </div>
    </div>
  );
};

const LowStock = () => {
  return (
    <div className="m-6 bg-gray-50 rounded-lg p-5">
      <Link href='/alerts' className="text-2xl font-bold mb-4">Stock Alerts</Link>
      <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
        <LowStockComponent
          productName="Lipgloss"
          quantity={2}
          lastUpdate={new Date()}
          status="Low Stock"
        />
        <LowStockComponent
          productName=" Cap"
          quantity={0}
          lastUpdate={new Date()}
          status="Out of Stock"
        />
        <LowStockComponent
          productName="Frontal"
          quantity={0}
          lastUpdate={new Date()}
          status="Out of Stock"
        />
        <LowStockComponent
          productName="Wig Cap"
          quantity={0}
          lastUpdate={new Date()}
          status="Out of Stock"
        />
        <LowStockComponent
          productName="Closure Wig"
          quantity={15}
          lastUpdate={new Date()}
          status="In Stock"
        />
      </div>
    </div>
  );
};

export default LowStock;