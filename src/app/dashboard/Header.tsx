"use client";

import { Home } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";

const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="mt-20 lg:mt-0 bg-white px-6 py-7">
      <div className="flex items-center justify-between">
        {isAuthenticated ? (
          <h1 className="text-2xl font-bold mb-2">
            Welcome back {user?.name} 👋🏾
          </h1>
        ) : (
          <div className="flex items-center">
            <Home size={30} className="text-pink-500" />
            <h1 className="text-2xl font-bold ml-3 text-pink-600">Dashboard</h1>
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500">
        Here’s a quick look at your inventory today.
      </p>
    </div>
  );
};

export default Header;