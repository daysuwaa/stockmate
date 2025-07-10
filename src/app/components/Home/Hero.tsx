"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FcBusinesswoman } from 'react-icons/fc';
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
  const router = useRouter();
  
  return (
    <div
      className="relative bg-gradient-to-br from-slate-50 via-green-50 to-yellow-100 py-24 lg:py-0 lg:min-h-screen flex items-center justify-center "
      id="home"
    >
      <section id="hero">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r shadow-lg from-green-100 to-yellow-100 px-4 py-2 rounded-full mb-6">
            <FcBusinesswoman size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">
              For solo sellers and small business
            </span>
          </div>
           <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          
          <span className="bg-gradient-to-r from-green-600 via-lime-600 to-yellow-400 bg-clip-text text-transparent">
            Inventory
          </span>{" "}
          tracker for
          <br />
        <span className="relative">
             everyday sellers
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 animate-pulse"></div>
        </span>
          </h1>
           </motion.h1>

          <p className="mt-4 text-gray-600 text-lg">
            Track products, monitor stock, and manage your inventory from one clean dashboard — no spreadsheets needed.
          </p>

          <div className="mt-6 flex gap-4 justify-center">
           <div className="mt-6 flex gap-4 justify-center">
  <button
    onClick={() => router.push("/auth/signup")}
    className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-green-600 text-sm flex items-center gap-2"
  >
    Get Started <ArrowRight size={16} />
  </button>

  <button className="text-green-700 border px-6 py-3 rounded hover:bg-gray-100 text-sm flex items-center gap-2">
    <PlayCircle size={16} />
    See Demo
  </button>
</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;