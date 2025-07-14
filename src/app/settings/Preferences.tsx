'use client';
import React, { useState } from 'react';
import { Globe, Bell, Moon, DollarSign } from 'lucide-react';

const Preferences = () => {
  const [form, setForm] = useState({
    language: 'en',
    currency: 'USD',
    theme: 'light',
    emailAlerts: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  return (
   <div className=" lg:max-w-3xl lg:mx-0 border-gray-200 border shadow-lg rounded-lg p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Globe className="w-5 h-5" />
        Preferences
      </h2>

      {/* Language */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Currency */}
      <div className="mb-6">
        <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Currency
        </label>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="USD">$ USD</option>
          <option value="EUR">€ Euro</option>
          <option value="NGN">₦ Naira</option>
        </select>
      </div>

      {/* Theme */}
      <div className="mb-6">
        <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Moon className="w-4 h-4" />
          Theme
        </label>
        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          name="emailAlerts"
          checked={form.emailAlerts}
          onChange={handleChange}
          className="w-5 h-5 text-purple-600"
        />
        <label htmlFor="emailAlerts" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Enable Email Notifications
        </label>
      </div>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        onClick={() => alert('Preferences saved ✅')}
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preferences;