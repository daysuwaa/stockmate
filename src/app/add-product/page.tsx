import React from 'react'
import Sidebar from '../components/Sidebar'
import AddProducts from './AddProduct'

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
      <AddProducts/>
      </div>
      
    </div>
  )
}

export default page
