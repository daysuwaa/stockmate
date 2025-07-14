'use client';
import Link from 'next/link';
import React, { useState } from 'react';

type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

interface NewProduct {
  name: string;
  category: string;
  quantity: number;
  status: StatusType;
}

const AddProduct = () => {
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    category: '',
    quantity: 0,
    status: 'In Stock',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(product); // Replace with API or context call
    alert('Product added!');
    setProduct({ name: '', category: '', quantity: 0, status: 'In Stock' });
  };

  return (
    <div className=" p-6 rouded-lg bg-white  mb-6 rounded-lg shadow-lg   ">
      <h2 className="text-2xl text-left font-bold text-gray-800 mb-4">Quick Add Product</h2>
      <p className='text-[14px]'>Need more options? <span className='underline text-blue-500'><Link href="/add-product"> Full Product Form</Link></span></p>
      <form className="space-y-4 mx-auto justify-center mt-4" onSubmit={handleSubmit}>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="e.g. Hair"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

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
          className="w-full bg-rose-400 hover:bg-rose-500 text-white text-sm py-2 rounded-md transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;