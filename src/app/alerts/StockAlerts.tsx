// app/(dashboard)/stock-alert/page.tsx
"use client";
import React from "react";
import { Package, RefreshCcw, Pencil, Bell } from "lucide-react";

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
                  <td className="p-4">{item.sku}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4 text-red-600 font-semibold">{item.quantity}</td>
                  <td className="p-4">{item.minStockLevel}</td>
                  <td className="p-4 flex gap-3">
                    <button className="text-blue-600 hover:underline  cursor-pointer text-xs flex items-center gap-1">
                      <RefreshCcw className="w-4 h-4" /> Restock
                    </button>
                    <button className="text-gray-600 hover:underline text-xs flex cursor-pointer items-center gap-1">
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button className="text-orange-500 hover:underline text-xs flex cursor-pointer items-center gap-1">
                      <Bell className="w-4 h-4" /> Notify
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
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;