'use client';
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ada',
    title: 'Home-Based Baker',
    quote:
      'I use StockMate to track ingredients before each market day. It’s simple, clear, and helps me stay ahead of bulk orders.',
  },
  {
    name: 'Chioma',
    title: 'Wig Vendor',
    quote:
      'StockMate replaced my messy notes app. I can now track closures, bundles, and packaging without stress.',
  },
  {
    name: 'Tomi',
    title: 'Thrift Seller',
    quote:
      'I use StockMate to sort pieces by size and brand. The restock alerts are a game changer before my IG drops!',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-pink-50 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full mb-4">
          <Quote className="text-pink-600 w-4 h-4" />
          <span className="text-sm font-medium text-pink-700">What they’re saying</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">
          Loved by solo vendors & small business owners
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Real stories from real people using StockMate to stay organized and stress-free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-pink-100"
          >
            <p className="text-gray-700 italic">“{t.quote}”</p>
            <div className="mt-4">
              <p className="font-semibold text-pink-700">{t.name}</p>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;