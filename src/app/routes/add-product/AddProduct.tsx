/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Package,
  // DollarSign,
  FileText,
  Tag,
  Save,
  X,
  // Box,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addInventoryItem } from "@/app/redux/slices/inventorySlice";
import { AppDispatch } from "@/app/redux/store/store";
import toast from "react-hot-toast";
import { BiMoney } from "react-icons/bi";
import { useRouter } from "next/navigation";

type StatusType = "In Stock" | "Low Stock" | "Out of Stock";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState<StatusType>("In Stock");
 const router = useRouter()
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const categories = [
    "Electronics",
    "Clothing & Accessories",
    "Office Supplies",
    "Furniture",
    "Home & Garden",
    "Sports & Outdoors",
    "Books & Stationaries",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Baby and Kids",
    "Food & Beverages",
    "Snacks & Drinks",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!productName.trim() || !category.trim() || !price || !quantity) {
      toast.error("❌ Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(
        addInventoryItem({
          name: productName,
          category,
          quantity: Number(quantity),
          status,
          price: Number(price),
        })
      ).unwrap();

      toast.success("✅ Product added successfully!");
      router.push('/routes/dashboard')

      // reset
      setProductName("");
      setCategory("");
      // setDescription("");
      setPrice("");
      setQuantity("");
      setStatus("In Stock");
    } catch (err: Error | unknown) {
      toast.error(`❌ Failed to add product: ${err}`);
      console.error("Add product failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setProductName("");
    setCategory("");
    // setDescription("");
    setPrice("");
    setQuantity("");
    setStatus("In Stock");
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl w-full shadow-xl overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Basic Info */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Package className="inline w-4 h-4 mr-1" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="inline w-4 h-4 mr-1" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BiMoney className="w-5 h-5" />
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StatusType)}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {submitting ? "Adding Product..." : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;