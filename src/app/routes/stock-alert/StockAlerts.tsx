/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import ViewModal from "./ViewModal";
import { Package, Check, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchInventoryStats, deleteInventoryItem } from "../../redux/slices/inventorySlice";
// import EditModal from "./EditModal";

const StockAlerts = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isViewModal, setIsViewModalOpen] = useState(false);
  // const [isEditModal, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.product);

  // Fetch inventory on mount
  useEffect(() => {
    dispatch(fetchInventoryStats());
  }, [dispatch]);

  // Filter low stock items
  const lowStockItems = items.filter((item) => item.quantity <= 10);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(lowStockItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = lowStockItems.slice(startIndex, endIndex);

  // Handlers
  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenView = (item: unknown) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };
  // const handleOpenEdit = (item: unknown) => {
  //   setSelectedItem(item);
  //   setIsEditModalOpen(true);
  // };

  const handleDismiss = () => {
    setIsDeleteModalOpen(false);
    toast.success("Low stock alert dismissed successfully!");
  };


  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white shadow rounded-2xl overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Quantity Left</th>
                <th className="p-4 text-center">status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 mb-7">
              {currentItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-red-500" />
                    {item.name}
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="text-center text-blue-600 font-semibold">
                    {item.quantity}
                  </td>
                  <td className={`text-center ${item.status==='Low Stock' ? 'text-yellow-400': 'text-red-500'} font-semibold`}>
                    {item.status}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => handleOpenView(item)}
                      className="text-blue-600 hover:underline cursor-pointer text-xs flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    {/* <button onClick={()=>handleOpenEdit(item)} className="text-gray-600 hover:underline text-xs flex cursor-pointer items-center gap-1">
                      <Pencil className="w-4 h-4" /> Edit
                    </button> */}
                    <button
  type="button"
  onClick={() => {
    setSelectedItem(item);        
    setIsDeleteModalOpen(true);     
  }}
  className="text-red-500 hover:underline text-xs flex cursor-pointer items-center gap-1"
>
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

          {/* Pagination Controls */}
          {lowStockItems.length > itemsPerPage && (
            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen  && selectedItem&&(
        <div className="fixed inset-0 bg-[#0000008a] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Low Stock Alert</h3>
            <p className="text-gray-600 mb-4">
              You are about to dismiss this low stock alert. Are you sure?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button onClick={() => {
                          console.log('Deleted:', selectedItem.id);
                           dispatch(deleteInventoryItem(selectedItem.id))
                          handleDismiss();
                        }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      <ViewModal
        isOpen={isViewModal}
        onClose={() => setIsViewModalOpen(false)}
        item={selectedItem}
      />
     {/* <EditModal 
  isOpen={isEditModal} 
  onClose={() => setIsEditModalOpen(false)} 
  item={selectedItem}  // Pass the actual selected item
  onSave={(updatedItem) => {
    // Dispatch your update action here
    dispatch(updateInventoryItem(updatedItem));
    setIsEditModalOpen(false);
    toast.success("Item updated successfully!");
  }} 
/> */}
    </div>
  );
};

export default StockAlerts;