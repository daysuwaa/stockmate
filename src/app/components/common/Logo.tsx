import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center  gap-2 p-3">
      <Link href="/" className="flex items-center gap-3 group">
        {/* Modern Abstract Icon */}
        <div className="relative w-10 h-10">
          {/* Gradient background circle */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
          
          {/* White S shape overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M16 8C16 6.34315 14.6569 5 13 5H9C7.34315 5 6 6.34315 6 8C6 9.65685 7.34315 11 9 11H15C16.6569 11 18 12.3431 18 14C18 15.6569 16.6569 17 15 17H9C7.34315 17 6 15.6569 6 14" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                className="group-hover:stroke-rose-100 transition-colors duration-300"
              />
            </svg>
          </div>
        </div>

        {/* Wordmark with modern styling */}
        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Stock
            </span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Mate
            </span>
          </h1>
          <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase mt-0.5">
            Inventory System
          </span>
        </div>
      </Link>
    </div>
  )
}

export default Logo