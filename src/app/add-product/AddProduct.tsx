/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Package,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addInventoryItem } from "@/app/redux/slices/inventorySlice";
import { AppDispatch } from "@/app/redux/store/store";
import toast from "react-hot-toast";

type StatusType = "In Stock" | "Low Stock" | "Out of Stock";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    sku: "",
    supplier: "",
    expiryDate: "",
    status: "In Stock" as StatusType,
    tags: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [, setSubmitSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Food & Beverages",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Valid quantity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("❌ Please fix the form errors first.");
      return;
    }

    try {
      setSubmitting(true);

      await dispatch(
        addInventoryItem({
          name: formData.productName,
          category: formData.category,
          quantity: Number(formData.quantity),
          status: formData.status,
          price: Number(formData.price),
        })
      ).unwrap();

      setSubmitSuccess(true);
      toast.success("✅ Product added successfully!");

      setFormData({
        productName: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        sku: "",
        supplier: "",
        expiryDate: "",
        status: "In Stock",
        tags: "",
        image: null,
      });
    } catch (err: any) {
      toast.error(`❌ Failed to add product: ${err}`);
      console.error("Add product failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      sku: "",
      supplier: "",
      expiryDate: "",
      status: "In Stock",
      tags: "",
      image: null,
    });
    setErrors({});
  };

  const InputField = ({
    name,
    label,
    type = "text",
    icon: Icon,
    placeholder,
    required = false,
    min,
    step,
  }: {
    name: string;
    label: string;
    type?: string;
    icon: React.ElementType;
    placeholder?: string;
    required?: boolean;
    min?: string;
    step?: string;
  }) => (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <Icon className="w-4 h-4" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={(formData as any)[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors[name]
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors[name] && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  );

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
                <InputField
                  name="productName"
                  label="Product Name"
                  icon={Package}
                  placeholder="Enter product name"
                  required
                />
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Tag className="w-4 h-4" />
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.category
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField
                  name="price"
                  label="Price"
                  type="number"
                  icon={DollarSign}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
                <InputField
                  name="quantity"
                  label="Quantity"
                  type="number"
                  icon={Hash}
                  placeholder="0"
                  required
                  min="0"
                />
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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