import React from 'react'

const Spinner = () => {
  return (
   <div className="flex items-center justify-center min-h-screen">
  <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
</div>
  )
}

export default Spinner