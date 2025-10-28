import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Header from './Headers'
import Settings from './Settings'

const page = () => {
  return (
    <div className="flex h-screen  bg-gradient-to-br from-white to-green-50">
      <Sidebar/>
      <div className="flex-1 overflow-y-auto lg:ml-[16rem]">
        <Header/>
      <Settings/>
      </div>
      
    </div>
  )
}

export default page
