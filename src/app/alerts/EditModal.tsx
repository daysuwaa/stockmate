import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';

type Item = {
  id: string; // Changed to string to match your Redux type
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'; // More specific type
  price: number;
  updated: string; // Added missing updated field
};

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  onSave: (item: Item) => void;
};

// Add categories constant
// const categories = [
//   "Electronics",
//   "Clothing & Accessories",
//   "Office Supplies",
//   "Furniture",
//   "Home & Garden",
//   "Sports & Outdoors",
//   "Books & Stationaries",
//   "Toys & Games",
//   "Health & Beauty",
//   "Automotive",
//   "Baby and Kids",
//   "Food & Beverages",
//   "Snacks & Drinks",
//   "Others"
// ];

const EditModal = ({ isOpen, onClose, item, onSave }: EditModalProps) => {
  const [formData, setFormData] = useState<Item | null>(null);

  // Initialize formData when modal opens with an item
  useEffect(() => {
    if (isOpen && item) {
      setFormData(item);
    }
  }, [isOpen, item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev =>
      prev ? { 
        ...prev, 
        [name]: name === "quantity" || name === "price" ? Number(value) : value 
      } : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen || !item) return null;

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 opacity-70"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <form className="relative z-10 space-y-6 p-6" onSubmit={handleSubmit}>
            {/* Enhanced Header */}
            <div className='flex items-center justify-between group'>
              <div className="flex items-center">
                <div className="relative">
                  <Edit className='bg-gradient-to-r from-purple-500 to-pink-600 text-white p-2.5 rounded-xl h-11 w-11 shadow-lg transform group-hover:rotate-6 transition-all duration-300'/>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <h1 className='font-bold text-xl bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent'>
                    EDIT ITEM
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Modify item details</p>
                </div>
              </div>
              
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="group flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:ring-blue-200 overflow-hidden"
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
                  <div className="absolute inset-0 bg-white/20 rounded-lg animate-ping"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;