"use client";

import { Home, Calendar } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import Image from "next/image";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const profile = useSelector((state: RootState) => state.settings.profile);
  const displayName = profile.name || user?.name;
  const displayEmail = profile.email || user?.email;  
  const displayAvatar = profile?.avatar || user?.avatar || "/default-avatar.webp"; 


  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  return (
    <div className="mt-20 lg:mt-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 border-b border-gray-100">
      {/* Main Header Section */}
      <div className="px-6 pt-8">
        <div className="lg:flex items-center justify-between mb-4">
          {isAuthenticated ? (
            <>
              {/* Left side - Name only */}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-900 bg-clip-text text-transparent mb-1">
                  Welcome back, {displayName ? capitalize(displayName) : "Guest"}! 👋🏾
                </h1>
              </div>

              {/* Right side - Email, Date, Profile */}
              <div className="lg:flex items-center space-x-6 mt-5 lg:mt-0">
                {/* Email and Date info */}
                <div className="lg:text-right items-center flex">
                  <div>
                  <p className="text-gray-600 flex items-center lg:justify-end mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {displayEmail}
                  </p>
                  <p className="text-gray-500 flex items-center lg:justify-end">
                    <Calendar className="w-4 h-4 mr-2" />
                    {getCurrentDate()}
                  </p>
                  </div>
                   <div className="relative ml-auto justify-end lg:hidden">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-blue-100">
                    <Image
                      src={displayAvatar}
                      alt="User Avatar"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                </div>

                {/* Avatar */}
                <div className="relative hidden lg:block">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-blue-100">
                    <Image
                      src={displayAvatar}
                      alt="User Avatar"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg">
                <Home size={30} className="text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-600">Manage your business with ease</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Heres your business overview for today. {isAuthenticated ? "Keep up the great work!" : "Sign in to view your analytics."}
          </p>
        </div>
      
      </div>
    </div>
  );
};

export default Header;