"use client";
import { AlertTriangle, Ban, CheckCircle } from 'lucide-react';
import React, {  useEffect} from 'react';
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
const borderColorClass = (status: StatusType) => {
  switch (status) {
    case 'In Stock':
      return "border-green-500"
    case 'Low Stock':
      return "border-yellow-500"
    case 'Out of Stock':
      return 'border-red-500'
    default:
      return null;
  }
};



const LowStockComponent = () => {
  
    const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(fetchInventoryStats());
}, [dispatch]);
const { items } = useSelector((s: RootState) => s.product);

  return (
    <div>
    <div className="m-6 bg-gray-50 rounded-lg p-5">
       <h1 className="text-2xl font-bold mb-3">Stock Alerts</h1>
        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
      {items.map((item)=>(

    <div key={item.id} className={`p-7 bg-white border-l-4 ${borderColorClass(item.status)} rounded-lg shadow-md min-w-[400px]`}>
      <div className="flex items-center justify-between mb-2">
        {getStatusIcon(item.status)}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
      
      <h3 className="font-medium text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      <div className="text-xs text-gray-400 mt-2">
        Last updated: {formatDate(item.updated)}
      </div>
    </div>
    ))}
    </div>

    </div>
    </div>
  );
};



export default LowStockComponent;