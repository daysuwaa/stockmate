'use client';
import React from 'react';
import { BrushIcon, Cookie, PaintRoller, Scissors, ShoppingCart } from 'lucide-react';
import { Package } from 'lucide-react';
import { BiDrink } from 'react-icons/bi';

const useCases = [
  {
    icon: <Scissors />,
    title: 'Wig Vendor',
    description:
      'Track different wig styles, bundles, closures, and accessories. Always know when popular items are running low before client appointments.',
    bgcolor:'bg-rose-100'  
  },
  {
    icon: <Cookie/>,
    title: 'Home-Based Baker',
    description:
      'Log ingredients like flour, eggs, sugar, and packaging. Use restock alerts to prep for baking days and avoid last-minute supply runs.',
       bgcolor:'bg-yellow-100'  
  },
  {
    icon: <ShoppingCart/>,
    title: 'Online Thrift Seller',
    description:
      'Sort inventory by brand, category, and size. Filter what’s low and plan smarter restocks for your online store or IG drop.',
       bgcolor:'bg-indigo-100'  
  },
  {
    icon: <PaintRoller/>,
    title: 'Creative / Artist',
    description:
      'Keep tabs on paint, brushes, canvases, and frames. See what’s left, and avoid delays in your next masterpiece.',
       bgcolor:'bg-gray-100'  
  },
   {
    icon: <BrushIcon/>,
    title: 'Skincare or Beauty Brand',
    description:
      'Monitor small-batch products, packaging, and restock cycles. Perfect for home-based cosmetic brands.',
    bgcolor:'bg-orange-200'  
  },
  {
    icon: <BiDrink/>,
    title: 'Smoothie & Drink Vendor',
    description:
      'Stay stocked on fruits, cups, and toppings. Avoid running out during peak hours with low-stock alerts.',
       bgcolor:'bg-green-100'  
  },
];

const UseCase = () => {
  return (
    <section id="use-cases" className="bg-white w-full py-20 px- my-12 min-h-screen max-6xl mx-auto">
    

<div className="text-center mb-24">
  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-yellow-100 px-4 py-2 rounded-full mb-4">
    <Package size={16} className="text-pink-600" />
    <span className="text-sm font-medium text-pink-700">Real Use Cases</span>
  </div>

  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-12 lg:leading-[5rem]" >
    <span className="bg-gradient-to-r  from-pink-600 to-yellow-600 bg-clip-text text-transparent">
      Made for the way you actually work
    </span>
    <br />
    Simple inventory tracking for real businesses
  </h2>

  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
    Whether you sell hair, pastries, art, or thrift finds, StockMate helps you stay organized, restock smarter, and grow without the overwhelm.
  </p>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-12 m mx-auto">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className={`bg-gray-50 p-7 rounded-xl shadow-sm hover:shadow-md transition ${useCase.bgcolor} `}
          >
            <div className="text-4xl mb-4">{useCase.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{useCase.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-6">{useCase.description}</p>
          </div>
        ))}
      </div>

      {/* Optional callout */}
      <div className="mt-16 text-center">
        <p className="text-lg font-medium text-gray-700">
          🛠️ Whatever you sell, StockMate helps you track it.  
          <br />
          <span className="text-indigo-600 font-semibold">If it’s countable, it’s trackable.</span>
        </p>
      </div>
    </section>
  );
};

export default UseCase;