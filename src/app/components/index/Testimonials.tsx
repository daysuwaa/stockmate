'use client';
import React from 'react';
import Image from 'next/image';
import Demo from "../../assests/demo.jpeg";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 bg-pink-50 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Tagline */}
        <div className="inline-flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full mb-4">
          <span className="text-sm font-medium text-pink-700">See StockMate in Action</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          A simple way to manage your inventory
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Here’s a sneak peek of how StockMate keeps your products organized, alerts you on low stock, and simplifies your workflow.
        </p>

        {/* Demo Image */}
        <div className="mt-10 relative rounded-2xl overflow-hidden shadow-xl border border-pink-100">
          <Image 
            src={Demo} 
            alt="StockMate App Demo" 
            className="w-full h-auto object-cover"
            priority
          />
          {/* subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-100/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;