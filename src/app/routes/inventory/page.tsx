import React from 'react'
import InventoryManagement from './InventoryManagement'
import Sidebar from '../../components/layout/Sidebar'
import Header from './components/Header'

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
