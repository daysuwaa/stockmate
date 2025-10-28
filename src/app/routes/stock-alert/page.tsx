import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import StockAlerts from './StockAlerts'
import Header from './Header'

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
        <Header/>
      <StockAlerts/>
      </div>
      
    </div>
  )
}

export default page
