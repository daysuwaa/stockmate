"use client"
import React, { useState } from 'react'
import Profile from './Profile'
import Security from './Security'
import { Palette, Shield, User } from 'lucide-react'
import Preferences from './Preferences'
const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile")

    const renderTab = () =>{
        switch(activeTab) {
            case "profile":
                return<Profile/>;
            case "theme":
                return<Preferences/>  
            case "security":
                return<Security/>
            default:
                return<Profile/>;          
        }
    };
  return (
    <div className='grid grid-cols-1 mx-6 md:max-w-4xl 2xl:max-w-7xl md:mx-auto lg:grid-cols-4 gap-8 my-5'>
         <nav className="space-y-2 lg:max-w-xs border  border-gray-300 rounded-lg shadow-lg p-4 h-fit">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all lg:hover:scale-105 ${
                      activeTab === "profile" ? "bg-gray-900 border-l-4 border-green-700 cursor-pointer text-white font-medium" : "cursor-pointer text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("theme")}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all lg:hover:scale-105 ${
                      activeTab === "theme" ? "bg-gray-900 border-l-4 border-green-700 cursor-pointer text-white font-medium" : "cursor-pointer text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span>Preferences</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("security")}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all lg:hover:scale-105 ${
                      activeTab === "security" ? "bg-gray-900 border-l-4 border-green-700 cursor-pointer text-white font-medium" : " cursor-pointer text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </div>
                  </button>
                </nav>
                <div className="lg:col-span-3">
            {renderTab()}
          </div>

    
    </div>
  )
}

export default Settings