"use client"
import { AlertCircle, Box, LucideLayoutDashboard, Search, Zap } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion";
import { BiMobile } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';


type FeaturesComponentProps = {
  header?: string;
  icon?: React.ReactNode;
  paragraph?: string;
  colorclass?: string
}

const FeaturesComponent = ({header, icon, paragraph, colorclass}: FeaturesComponentProps) =>{
  return(
    <div>
      <div className="p-6  rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition">
      <div className= {`text-3xl mb-4 ${colorclass} w-fit p-3 rounded-lg`}>{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{header}</h3>
      <p className="text-sm text-gray-600 mt-1 leading-7">{paragraph}</p>
      </div>
    </div>
  )
}

const Features = () => {
  return (

    <div className='min-h-sceen mt-[4rem] mb-[8rem] max-w-6xl lg:mx-auto mx-5' id='features'>
       <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-4">
              <Zap size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Amazing Features</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-12 lg:leading-[5rem]">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Everything you need to manage 
              </span>
              <br />
              your inventory without the chaos
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the features that make StockMate the go-to tool for modern inventory management.
            </p>
          </div>

  <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: false }}
    >
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 max-w-6xl mx-auto">
    
   <FeaturesComponent 
    header='Track Inventory'
    icon={<Box/>} 
    paragraph="Easily add, edit, and manage products with details like name, price, quantity, and category without the mess of spreadsheets."
    colorclass='bg-pink-100'
   />
   <FeaturesComponent
    header='Restock Alerts' 
    icon={<AlertCircle/>} paragraph="Automatically get notified when any product falls below your set threshold. Stay ahead of stockouts and make timely restocking." 
    colorclass='bg-green-100'
   />
   <FeaturesComponent 
   header='Dashboard Overview' 
   icon={<LucideLayoutDashboard/>} 
   paragraph="Get a clear, visual snapshot of your entire inventory including total items, current stock value and recent activity all in one place." 
   colorclass='bg-blue-100'
   />
   <FeaturesComponent 
   header='Smart Search' 
   icon={<Search/>} 
   paragraph="Instantly search and filter your inventory by product name, category, or quantity. Find  what you need, even with hundreds of items." 
   colorclass='bg-yellow-100'
   />
   <FeaturesComponent 
   header='Mobile-Friendly Design' 
   icon={<BiMobile/>} 
   paragraph="Whether you’re on the go or at your desk, StockMate’s responsive design makes it easy to track and update your stock from any device." 
   colorclass='bg-red-100'
   />
    <div>
      <div className="p-6  rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition">
      <div className= {`text-3xl mb-4 bg-purple-100 w-fit p-3 rounded-lg`}><BsPeople/></div>
      <h3 className="text-xl font-bold text-gray-800 flex items-center">Multi-User Access<span className='border-dashed border text-[10px] font-normal rounded-full p-1 ml-2'>coming soon</span></h3>
      <p className="text-sm text-gray-600 mt-1 leading-7">Invite team members to manage your inventory together. Set permissions, share access, and keep your business organized.</p>
      </div>
    </div>
  </div>
  </motion.div>
</div>


  )
}

export default Features