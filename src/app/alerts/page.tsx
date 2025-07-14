import React from 'react'
import Sidebar from '../components/Sidebar'
import StockAlerts from './StockAlerts'

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
      <StockAlerts/>
      </div>
      
    </div>
  )
}

export default page
