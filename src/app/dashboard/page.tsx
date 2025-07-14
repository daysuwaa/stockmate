import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import Header from './Header'
import Stats from './Stats'
import InventoryTable from './InventoryTable'
import LowStock from './LowStock'
import AddProduct from './AddProduct'
import RecentLogs from './RecentLogs'

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
       <Header/>
      <Stats/>
      <InventoryTable/>
      <LowStock/>
      <div className='grid lg:grid-cols-2 mx-6 gap-6'>
      <AddProduct/>
      <RecentLogs/>
      </div>
      </div>
      
    </div>
  )
}

export default page