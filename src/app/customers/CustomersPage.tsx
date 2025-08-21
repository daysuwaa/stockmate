"use client";
import React, { useState, useEffect } from "react";
import AddCustomerModal from "./AddCustomerModal";
import toast from "react-hot-toast"
import {
  // User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Eye,
  X,
  Calendar,
  Tag,
  // Edit,
  Trash2,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Ada Obi",
    email: "adaobi@email.com",
    phone: "+234 812 345 6789",
    address: "Lagos, Nigeria",
    joinDate: "2024-01-15",
    status: "Active",
    avatar: "AO",
  },
  {
    id: 2,
    name: "Simi Musa",
    email: "simimusa@yahoo.com",
    phone: "+234 901 234 5678",
    address: "Abuja, Nigeria",
    joinDate: "2024-02-20",
    status: "Active",
    avatar: "SM",
  },
  {
    id: 3,
    name: "Jola Fk",
    email: "jk@email.com",
    phone: "+234 901 444 5678",
    address: "Abuja, Nigeria",
    joinDate: "2024-03-10",
    status: "Inactive",
    avatar: "JF",
  },
];

const CustomersPage = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Open modal with animation
  const handleOpen = (id: number) => {
    setOpenModal(id);
    setIsModalVisible(true);
  };

  // Close modal with animation
  const handleClose = () => {
    setIsModalVisible(false);
    setTimeout(() => setOpenModal(null), 200);
  };

  const handleCloseDeleteModal = () =>{
    setIsDeleteModalOpen(false)
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openModal) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openModal]);

  // Find the selected customer
  const selectedCustomer = customers.find((c) => c.id === openModal);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <h1 className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
            <User className="w-6 h-6" />
            Customers
          </h1> */}
          <button onClick={()=>setIsModalOpen(true)} className=" cursor-pointer ml-auto flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 hover:scale-105 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <table className="w-full text-left table-auto">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-sm text-gray-700 uppercase">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold text-xs">
                        {customer.avatar}
                      </div>
                      {customer.name}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {customer.email}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {customer.phone}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {customer.address}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleOpen(customer.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-all duration-200 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedCustomer && (
        <div 
          className={`fixed inset-0 bg-[#0000006a] bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-200 ${
            isModalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        >
          <div 
            className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
              isModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-yellow-500 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 shadow-md shadow-yellow-400 flex items-center justify-center text-yellow-400 font-bold text-lg">
                    {selectedCustomer.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-yellow-900">{selectedCustomer.name}</h2>
                    <p className="text-yellow-200 text-sm">Customer Details</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white cursor-pointer p-2 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCustomer.status === "Active"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  <Tag className="w-4 h-4 inline mr-2" />
                  {selectedCustomer.status}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-gray-800 font-medium">{selectedCustomer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                      <p className="text-gray-800 font-medium">{selectedCustomer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                      <p className="text-gray-800 font-medium">{selectedCustomer.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Join Date</p>
                      <p className="text-gray-800 font-medium">{formatDate(selectedCustomer.joinDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t justify-between border-gray-200">
                {/* <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  <Edit className="w-4 h-4" />
                  Edit Customer
                </button> */}
                <button
                  onClick={handleClose}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button onClick={()=>{
               
                  handleClose()
                  setIsDeleteModalOpen(true);
                }} className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            {/* <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
      {
  isDeleteModalOpen && (
    <div className="fixed inset-0 bg-[#0000008a] bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 scale-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delete Customer</h2>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete this customer? All associated data will be permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <button
            onClick={handleCloseDeleteModal}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCloseDeleteModal();
              toast.success('Customer deleted successfully!');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    </div>
  );
};

export default CustomersPage;