// app/(dashboard)/stock-alert/page.tsx
"use client";
import React, { useState } from "react";
import ViewModal from "./ViewModal";
import { Package, Pencil, Check, Eye, 
  // Bell 

} from "lucide-react";
import {toast} from "react-hot-toast";
const lowStockItems = [
  {
    id: 1,
    name: "Wireless Mouse",
    sku: "ELEC-001",
    category: "Electronics",
    quantity: 2,
    minStockLevel: 5,
  },
  {
    id: 2,
    name: "Sports Water Bottle",
    sku: "SPORT-014",
    category: "Sports & Outdoors",
    quantity: 1,
    minStockLevel: 3,
  },
  {
    id: 3,
    name: "Laptop Charger",
    sku: "ELEC-097",
    category: "Electronics",
    quantity: 0,
    minStockLevel: 2,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    sku: "ELEC-001",
    category: "Electronics",
    quantity: 2,
    minStockLevel: 5,
  },
  {
    id: 5,
    name: "Sports Water Bottle",
    sku: "SPORT-014",
    category: "Sports & Outdoors",
    quantity: 1,
    minStockLevel: 3,
  },
  {
    id: 6,
    name: "Laptop Charger",
    sku: "ELEC-097",
    category: "Electronics",
    quantity: 0,
    minStockLevel: 2,
  },
  {
    id: 7,
    name: "Wireless Mouse",
    sku: "ELEC-001",
    category: "Electronics",
    quantity: 2,
    minStockLevel: 5,
  },
  {
    id:8,
    name: "Sports Water Bottle",
    sku: "SPORT-014",
    category: "Sports & Outdoors",
    quantity: 1,
    minStockLevel: 3,
  },
  {
    id: 9,
    name: "Laptop Charger",
    sku: "ELEC-097",
    category: "Electronics",
    quantity: 0,
    minStockLevel: 2,
  },
  {
    id: 10,
    name: "Wireless Mouse",
    sku: "ELEC-001",
    category: "Electronics",
    quantity: 2,
    minStockLevel: 5,
  },
  {
    id: 11,
    name: "Sports Water Bottle",
    sku: "SPORT-014",
    category: "Sports & Outdoors",
    quantity: 1,
    minStockLevel: 3,
  },
  {
    id: 12,
    name: "Laptop Charger",
    sku: "ELEC-097",
    category: "Electronics",
    quantity: 0,
    minStockLevel: 2,
  },
];

const StockAlerts = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [selectedItem, setSelectedItem] = useState(null);
  const [isViewModal, setIsViewModalOpen] = useState(false);
  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };
    const handleOpenView = (item: any) => {
    setSelectedItem(item); // store clicked item
    setIsViewModalOpen(true);
  };
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Min Stock Level</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 mb-7">
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-t ">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-red-500" />
                    {item.name}
                  </td>
                  <td className="p-">{item.sku}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="text-center text-red-600 font-semibold">{item.quantity}</td>
                  <td className="text-center">{item.minStockLevel}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={()=>{
                      handleOpenView(item)
                    }} className="text-blue-600 hover:underline  cursor-pointer text-xs flex items-center gap-1">
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button className="text-gray-600 hover:underline text-xs flex cursor-pointer items-center gap-1">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={()=>{
                      setIsDeleteModalOpen(true)
                    }} className="text-red-500 hover:underline text-xs flex cursor-pointer items-center gap-1">
                      <Check className="w-4 h-4" /> Dismiss
                    </button>
                  </td>
                </tr>
              ))}
              {lowStockItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    🎉 All products are sufficiently stocked!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {
            isDeleteModalOpen && (
              <div>
                <div className="fixed inset-0 bg-[#0000008a] bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-4">Low Stock Alert</h3>
                    <p className="text-gray-600 mb-4">You are about to dismiss this low stock alert. Are you sure?</p>
                    <div className="flex justify-end space-x-2">
                      <button 
                      onClick={()=>{
                        handleClose()
                        // toast.success('Low stock alert dismissed successfully!')
                      }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button 

                       onClick={()=>{
                        handleClose()
                        toast.success('Low stock alert dismissed successfully!')
                      }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
               </div>
               </div>
               )
          }
        </div>
      </div>
      <ViewModal 
  isOpen={isViewModal} 
  onClose={() => setIsViewModalOpen(false)} 
  item={selectedItem} // <-- singular, matches ViewModal props
/>
    </div>
  );
};

export default StockAlerts;