import React from 'react'
import InventoryManagement from './InventoryManagement'
import Sidebar from '../components/Sidebar'
import Header from './Header'

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
        <Header/>
      <InventoryManagement/>
      </div>
      
    </div>
  )
}

export default page
