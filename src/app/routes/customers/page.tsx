import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import CustomersPage from './CustomersPage'
import Header from './Header'


const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
        <Header/>
      <CustomersPage/>
      </div>
      
    </div>
  )
}

export default page
