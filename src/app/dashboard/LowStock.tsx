"use client";
import { AlertTriangle, Ban, CheckCircle, Package } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store"; 
import { fetchInventoryStats } from '../redux/slices/inventorySlice';

type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status styling configurations
const getStatusConfig = (status: StatusType) => {
  const configs = {
    'In Stock': {
      badge: 'bg-green-100 text-green-800 border-green-200',
      border: 'border-l-green-500',
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: 'bg-green-50'
    },
    'Low Stock': {
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      border: 'border-l-yellow-500',
      icon: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
      bg: 'bg-yellow-50'
    },
    'Out of Stock': {
      badge: 'bg-red-100 text-red-800 border-red-300',
      border: 'border-l-red-500',
      icon: <Ban className="text-red-600 w-5 h-5" />,
      bg: 'bg-red-50'
    }
  };
  return configs[status] || {
    badge: 'bg-gray-100 text-gray-800 border-gray-200',
    border: 'border-l-gray-500',
    icon: <Package className="text-gray-600 w-5 h-5" />,
    bg: 'bg-gray-50'
  };
};

const LowStockComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInventoryStats());
  }, [dispatch]);

  const { items } = useSelector((s: RootState) => s.product);
  
  // Filter items with quantity <= 20
  const lowStockItems = items.filter(item => item.quantity <= 20);

  if (lowStockItems.length === 0) {
    return (
      <div className="m-6 bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">All Stock Levels Good</h2>
        <p className="text-gray-500">No items with low stock (≤20 units) found.</p>
      </div>
    );
  }

  return (
    <div className="m-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Alerts</h1>
              <p className="text-gray-600 mt-1">Items with 20 or fewer units in stock</p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
              {lowStockItems.length} items need attention
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => {
              const config = getStatusConfig(item.status);
              
              return (
                <div 
                  key={item.id} 
                  className={`relative bg-white border-2 ${config.border} rounded-lg hover:shadow-md transition-shadow duration-200`}
                >
                  <div className={`absolute inset-0 ${config.bg} opacity-20 rounded-lg`}></div>
                  
                  <div className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {config.icon}
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badge}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Quantity:</span>
                          <span className={`font-bold text-lg ${
                            item.quantity === 0 ? 'text-red-600' : 
                            item.quantity <= 5 ? 'text-orange-600' : 
                            'text-yellow-600'
                          }`}>
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Last updated: {formatDate(item.updated)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowStockComponent;