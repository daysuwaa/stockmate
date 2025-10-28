"use client";
import { AlertTriangle, Ban, CheckCircle, Package } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchInventoryStats } from "../../redux/slices/inventorySlice";
import Link from "next/link";

type StatusType = "In Stock" | "Low Stock" | "Out of Stock";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status styling
const getStatusConfig = (status: StatusType) => {
  const configs = {
    "In Stock": {
      badge: "bg-green-100 text-green-800 border-green-200",
      border: "border-l-green-500",
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: "bg-green-50",
    },
    "Low Stock": {
      badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
      border: "border-l-yellow-500",
      icon: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
      bg: "bg-yellow-50",
    },
    "Out of Stock": {
      badge: "bg-red-100 text-red-800 border-red-300",
      border: "border-l-red-500",
      icon: <Ban className="text-red-600 w-5 h-5" />,
      bg: "bg-red-50",
    },
  };
  return (
    configs[status] || {
      badge: "bg-gray-100 text-gray-800 border-gray-200",
      border: "border-l-gray-500",
      icon: <Package className="text-gray-600 w-5 h-5" />,
      bg: "bg-gray-50",
    }
  );
};

const LowStockComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.product);

  useEffect(() => {
    dispatch(fetchInventoryStats());
  }, [dispatch]);

  // Get low stock
  const lowStockItems = items.filter((item) => item.quantity <= 20);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(lowStockItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = lowStockItems.slice(startIndex, endIndex);

  if (lowStockItems.length === 0) {
    return (
      <div className="m-6 bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          All Stock Levels Good
        </h2>
        <p className="text-gray-500">
          No items with low stock (≤20 units) found.
        </p>
      </div>
    );
  }

  return (
    <div className="m-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100  lg:flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Alerts</h1>
            <p className="text-gray-600 mt-1">
              Items with 20 or fewer units in stock
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 mt-2 lg:mt-0 w-fit px-3 py-2 rounded-lg text-sm font-medium">
            {lowStockItems.length} items need attention
          </div>
        </div>

        {/* Items */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((item) => {
              const config = getStatusConfig(item.status);
              return (
                <div
                  key={item.id}
                  className={`relative bg-white ${config.border} rounded-lg shadow-md`}
                >
                  <div
                    className={`absolute inset-0 ${config.bg} opacity-20 rounded-lg`}
                  ></div>
                  <div className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {config.icon}
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badge}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <span
                        className={`font-bold text-lg ${
                          item.quantity === 0
                            ? "text-red-600"
                            : item.quantity <= 5
                            ? "text-orange-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 border-t pt-2">
                      Last updated: {formatDate(item.updated)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-100 rounded cursor-pointer disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-100 rounded cursor-pointer disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          <Link
            href="/routes/stock-alert"
            className="flex text-sm justify-center cursor-pointer lg:justify-end mt-3 mb-3 underline text-blue-600"
          >
            View All Alerts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LowStockComponent;