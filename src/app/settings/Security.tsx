"use client"
import { Shield} from "lucide-react";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import {  updateSecurity } from "../redux/slices/settingsSlice";
const Security = () => {
  const dispatch = useDispatch();
  const security = useSelector((state:RootState)=>state.settings.security)

  
  return (
   <div className=" lg:max-w-3xl lg:mx-0 border-gray-200 border shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-6 flex items-center"><span><Shield className="mr-2"/></span>Security</h2>
      <label>Current Password</label>
      <input
        type="password"
        value={security.currentPassword}
        onChange={(e) => 
          dispatch(updateSecurity({currentPassword:e.target.value}))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      <label>New Password</label>
      <input
        type="password"
        value={security.newPassword}
        onChange={(e) => 
           dispatch(updateSecurity({newPassword:e.target.value}))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
        
      <label>Confirm Password</label>
      <input
      type="password"
        value={security.confirmPassword}
        onChange={(e) => 
           dispatch(updateSecurity({confirmPassword:e.target.value}))}
        className="w-full px-4 py-3 my-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />

         <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Update Password</button>
      
    </div>
  );
};

export default Security;