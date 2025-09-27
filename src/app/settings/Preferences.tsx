'use client';
import React from 'react';
import { Globe, Moon, DollarSign } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { updatePreferences } from "../redux/slices/settingsSlice";

const Preferences = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.settings.preferences);

  return (
   <div className="lg:max-w-3xl lg:mx-0 border-gray-200 border shadow-lg rounded-lg p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Globe className="w-5 h-5" />
        Preferences
      </h2>

      {/* Language */}
      {/* <div className="mb-6 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select
          value={preferences.language}
          onChange={(e)=>
            dispatch(updatePreferences({ language: e.target.value }))
          }
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div> */}
      {/* Currency */}
      <div className="mb-6">
        <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Currency
        </label>
        <select
          value={preferences.currency}
          onChange={(e)=>{
            dispatch(updatePreferences({ currency: e.target.value }))
          }}
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="NGN">₦ Naira</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ Euro</option>
         
        </select>
      </div>

      {/* Theme */}
      <div className="mb-6 ">
        <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Moon className="w-4 h-4" />
          Theme
        </label>
        <select
          value={preferences.darkMode}
          // inside Preferences component
onChange={(e) => {
  console.log("PREF select change:", e.target.value); // <--- see value
  dispatch(updatePreferences({ darkMode: e.target.value as "light" | "dark" }));
}}
          className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Notifications */}
      {/* <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={preferences.notifications ?? true}
          onChange={(e) => 
            dispatch(updatePreferences({ notifications: e.target.checked }))
          }
          className="w-5 h-5 text-purple-600"
        />
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Enable Email Notifications
        </label>
      </div> */}

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