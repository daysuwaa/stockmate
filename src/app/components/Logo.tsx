import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-items-center gap-2 p-7'>
        <Link href="/">
      <div className="relative w-10 h-10">
        {/* S shape made with geometric blocks */}
        <div className="absolute top- left-3 w-7 h-2 bg-purple-500 rounded-sm"></div>
        <div className="absolute bottom-[-4px] right-0 w-7 h-2 bg-purple-600 rounded-sm"></div>
        {/* Accent square */}
        <div className="absolute top-4 left-0 w-2 h-2 bg-pink-500 rounded-sm"></div>
        <div className='ml-7'>
        <h1 className="text-lg pt-[6px] font-bold tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.02em' }}>
        <span className="text-purple-500">Stock</span>
        <span className="text-pink-500">Mate</span>
      </h1>
      </div>
      </div>
      </Link>
      </div>
  )
}

export default Logo