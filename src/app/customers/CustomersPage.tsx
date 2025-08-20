// app/(dashboard)/customers/page.tsx
"use client";
import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Ada Obi",
    email: "adaobi@example.com",
    phone: "+234 812 345 6789",
    address: "Lagos, Nigeria",
  },
  {
    id: 2,
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "+234 901 234 5678",
    address: "Abuja, Nigeria",
  },
];

const CustomersPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
            <User className="w-6 h-6" />
            Customers
          </h1>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4 font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    {customer.name}
                  </td>
                  <td className="p-4 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {customer.email}
                  </td>
                  <td className="p-4 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {customer.phone}
                  </td>
                  <td className="p-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {customer.address}
                  </td>
                  <td className="p-4 flex gap-3 text-sm">
                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="text-gray-600 hover:underline flex items-center gap-1">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline flex items-center gap-1">
                      <Trash className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No customers found.
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

export default CustomersPage;