import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2 p-3">
      <Link href="/" className="flex items-center gap-2">
        {/* Geometric S Shape */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute top-1 left-1 w-6 h-2 bg-rose-500 rounded-sm"></div>
          <div className="absolute bottom-1 left-[-8px] w-6 h-2 bg-pink-400 rounded-sm"></div>
          <div className="absolute top-4 left-2 w-2 h-2 bg-pink-500 rounded-sm"></div>
        </div>

        {/* Wordmark */}
        <h1
          className="text-xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
        >
          <span className="text-rose-400">Stock</span>
          <span className="text-pink-500">Mate</span>
        </h1>
      </Link>
    </div>
  )
}

export default Logo