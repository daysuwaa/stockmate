/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addInventoryItem } from "@/app/redux/slices/inventorySlice";
import { AppDispatch } from "@/app/redux/store/store";
import toast from "react-hot-toast"; // 👈 import

type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

interface NewProduct {
  name: string;
  category: string;
  quantity: number;
  status: StatusType;
  price: number;
}

const AddProduct = () => {
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    category: '',
    quantity: 0,
    status: 'In Stock',
    price: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await dispatch(
        addInventoryItem({
          name: product.name,
          category: product.category,
          quantity: product.quantity,
          status: product.status,
          price: product.price,
        })
      ).unwrap();

      setProduct({ name: '', category: '', quantity: 0, status: 'In Stock', price: 0 });
      toast.success("✅ Product added successfully!");
    } catch (err: any) {
      toast.error(`❌ Failed to add product: ${err}`);
      console.error("Add product failed:", err);
    } finally {
      setSubmitting(false);
    }
  };
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

  return (
    <div className=" p-6 bg-white mb-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-left font-bold text-gray-800 mb-4">Quick Add Product</h2>
      <p className='text-[14px]'>Need more options? <span className='underline text-blue-500'><Link href="/add-product"> Full Product Form</Link></span></p>
      <form className="space-y-4 mx-auto justify-center mt-4" onSubmit={handleSubmit}>
        {/* name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="e.g. Lace Wig"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        {/* category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
        </div>
        {/* quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            min={0}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        {/* price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min={0}
            step="0.01"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="0.00"
          />
        </div>
        {/* status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-rose-400 hover:bg-rose-500 text-white text-sm py-2 rounded-md transition disabled:opacity-60"
        >
          {submitting ? 'Adding…' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;