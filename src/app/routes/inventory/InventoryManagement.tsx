"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, deleteInventoryItem , updateInventoryItem} from "../../redux/slices/inventorySlice";
import { AppDispatch, RootState } from "../../redux/store/store"; 
import { formatCurrency } from "../../utils/formatCurrency"
import Modal from './Modal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  EyeIcon,
} from 'lucide-react';
import {  Download, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import {exportToExcel} from "./components/Export"
import Spinner from '../../components/common/Spinner';
import { InventoryItem } from '@/app/types/InventoryItem';


export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const { currency } = useSelector((s: RootState) => s.settings.preferences);
 const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.product);

  useEffect(() => {
    dispatch(fetchInventory()); 
  }, [dispatch]);


  // categories now come from Redux items
  const categories = useMemo(() => {
  const cats = [...new Set(items.map((item) => item.category))];
  return ["All", ...cats];
}, [items]);
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];
    const router = useRouter();

  const filteredData = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items,searchTerm, filterCategory, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ActionButton = ({ icon: Icon, onClick, className = "", title }: {
    icon: React.ElementType;
    onClick: () => void;
    className?: string;
    title: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-200 ${className}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

const openModal = (type: 'view' | 'edit' | 'delete', item: InventoryItem) => {
  setSelectedItem(item);
  setModalType(type);
};

const closeModal = () => {
  setModalType(null);
  setSelectedItem(null);
};
const [formData, setFormData] = useState<InventoryItem | null>(null);

useEffect(() => {
  if (modalType === "edit" && selectedItem) {
    setFormData(selectedItem);
  }
}, [modalType, selectedItem]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev =>
    prev ? { ...prev, [name]: name === "quantity" || name === "price" ? Number(value) : value } : null
  );
};
  
if (loading) 
  return (
  <Spinner/>
  );
if (error) 
  return <p className='text-gray-500 text-sm text-center'>No inventory yet</p>
  return (
    
    <div className="bg-white rounded-xl shadow-lg m-6 overflow-hidden">
        
         <div className="flex gap-3 mt-4 mx-6">
            <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            className="flex items-center border gap-2 cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            onClick={() => exportToExcel(items)}
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
      {/* Filters */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">ID: {item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  {item.quantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  {formatCurrency(item.price, currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {formatDate(item.updated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-1">
                    <ActionButton
                    icon={Eye}
                    onClick={() => openModal('view', item)}
                    className="hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                    title="View Details"
                    />
                    <ActionButton
                    icon={Edit}
                    onClick={()=>{
                      openModal('edit', item)
                      dispatch(updateInventoryItem(item))
                    }}
                    className="hover:bg-green-100 hover:text-green-600 cursor-pointer"
                    title="Edit Item"
                    />
                    <ActionButton
                    icon={Trash2}
                    onClick={()=>{
                      openModal('delete', item)
                    }}
                    className="hover:bg-red-100 hover:text-red-600 cursor-pointer"
                    title="Delete Item"
                     />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">
            of {filteredData.length} items
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* modallll */}
      {/* to view inevntory */}
      <Modal isOpen={!!modalType} onClose={closeModal} >
  {modalType === 'view' && selectedItem && (
  <div className="relative overflow-hidden ">
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60 animate-pulse"></div>
    
    <div className="relative z-10 space-y-6 p-1">
      {/* Header with enhanced styling and animation */}
      <div className='flex items-center justify-between group'>
        <div className="flex items-center">
          <div className="relative">
            <EyeIcon className='bg-gradient-to-r from-pink-500 to-gray-300 text-white p-2 rounded-full h-10 w-10 shadow-lg transform group-hover:scale-110 transition-all duration-300'/>
            {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce"></div> */}
          </div>
          <div className="ml-3">
            <h1 className='font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
              ITEM DETAILS
            </h1>
            <p className="text-xs text-gray-500 font-medium">Complete overview</p>
          </div>
        </div>
        
        {/* Status badge in header */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm transform hover:scale-105 transition-all ${
          selectedItem.status === 'In Stock' ? 'bg-green-100 text-green-700 border border-green-200' :
          selectedItem.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
          selectedItem.status === 'Out of Stock' ? 'bg-red-100 text-red-700 border border-red-200' :
          'bg-gray-100 text-gray-700 border border-gray-200'
        }`}>
          {selectedItem.status}
        </div>
      </div>

      {/* Main content cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:animate-pulse"></div>
            <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Product Name</span>
          </div>
          <span className="text-gray-900 font-bold text-lg">{selectedItem.name}</span>
        </div>
        
        {/* Category Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></div>
            <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Category</span>
          </div>
          <span className="text-gray-900 font-medium">{selectedItem.category}</span>
        </div>
        
        {/* Quantity Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:animate-pulse"></div>
            <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Quantity</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-900 font-mono text-2xl font-bold mr-2">{selectedItem.quantity}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">units</span>
          </div>
        </div>
        
        {/* Price Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:animate-pulse"></div>
            <span className="text-gray-600 text-xs font-semibold uppercase tracking-wide">Price</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-gray-900 font-bold text-2xl">{formatCurrency(selectedItem.price, currency)}</span>
          </div>
        </div>
      </div>
      
      {/* Last updated section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">Last Updated</p>
              <p className="text-gray-900 font-medium">{formatDate(selectedItem.updated)}</p>
            </div>
          </div>
          
          {/* Mini chart visualization */}
          <div className="hidden sm:flex items-end space-x-1 opacity-60">
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{modalType === 'edit' && selectedItem && (
  <div className="relative overflow-hidden ">
    <form className="relative z-10 space-y-6 p-1" onSubmit={(e) => {
      e.preventDefault();
      if (formData) {
        dispatch(updateInventoryItem(formData));
        closeModal();
      }
    }}>
      {/* Enhanced Header */}
      <div className='flex items-center justify-between group'>
        <div className="flex items-center">
          <div className="relative">
            <Edit className=' bg-blue-500 text-white p-2.5 rounded-xl h-11 w-11 shadow-lg transform group-hover:rotate-6 transition-all duration-300'/>
          </div>
          <div className="ml-3">
            <h1 className='font-bold text-xl bg-gradient-to-r from-blue-700 to-gray-600 bg-clip-text text-transparent'>
              EDIT ITEM
            </h1>
            <p className="text-xs text-gray-500 font-medium">Modify item details</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Name Field */}
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-focus-within:animate-pulse"></div>
            Product Name
          </label>
          <div className="relative">
            <input 
              type="text" 
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:shadow-md"
              placeholder="Enter product name..."
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        {/* Category Field */}
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2 group-focus-within:animate-pulse"></div>
            Category
          </label>
          <div className="relative">
            <select 
              name="category"
              value={formData?.category || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white appearance-none cursor-pointer group-hover:shadow-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing & Accessories">Clothing & Accessories</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Furniture">Furniture</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Books & Stationaries">Books & Stationaries</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Automotive">Automotive</option>
              <option value="Baby and Kids">Baby and Kids</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Snacks & Drinks">Snacks & Drinks</option>
              <option value="Others">Others</option>
              {categories.filter(cat => cat !== "All").map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Quantity Field */}
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-focus-within:animate-pulse"></div>
            Quantity
          </label>
          <div className="relative">
            <input 
              type="number" 
              name="quantity"
              value={formData?.quantity ?? 0}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:shadow-md"
              placeholder="0"
              min="0"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">units</span>
            </div>
          </div>
        </div>

        {/* Status Field */}
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-focus-within:animate-pulse"></div>
            Stock Status
          </label>
          <div className="relative">
            <select 
              name="status"
              value={formData?.status || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white appearance-none cursor-pointer group-hover:shadow-md"
              required
            >
              <option value="">Select Status</option>
              <option value="In Stock">✅ In Stock</option>
              <option value="Low Stock">⚠️ Low Stock</option>
              <option value="Out of Stock">❌ Out of Stock</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Price Field */}
        <div className="group">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-focus-within:animate-pulse"></div>
            Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-gray-500 font-bold">$</span>
            </div>
            <input 
              type="number" 
              name="price"
              value={formData?.price ?? 0}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 pl-8 pr-12 py-3 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:shadow-md"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">USD</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Enhanced Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:ring-blue-200 overflow-hidden"
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button content */}
          <div className="relative flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Save Changes</span>
          </div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 opacity-0 group-active:opacity-100">
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
          </div>
        </button>
        
        {/* Helper text */}
        <p className="text-xs text-gray-500 text-center mt-2 opacity-75">
          Changes will be saved immediately after confirmation
        </p>
      </div>
    </form>
  </div>
)}

  {modalType === 'delete' && selectedItem && (
    <div>
      <p className="mb-4 text-sm">Are you sure you want to delete <strong>{selectedItem.name}</strong>?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log('Deleted:', selectedItem.id);
             dispatch(deleteInventoryItem(selectedItem.id))
            closeModal();
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )}
      </Modal>
    </div>
  );
}