import React, {useState} from 'react'
import toast from "react-hot-toast";
type ModalProps ={
    isOpen: boolean,
    onClose: () => void,
    
}
const AddCustomerModal = ({isOpen, onClose,}: ModalProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    if(!isOpen) return null // if not open show nothen
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className='text-xl font-semibold mb-3'>Add New Customers</h1>
        <input 
            type='text' 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            placeholder='Full Name' 
            className='border border-gray-300 px-3 py-2 rounded-lg w-full mb-4' 
        />

        <input 
            type='email' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder='Email Address' 
            className='border border-gray-300 px-3 py-2 rounded-lg w-full mb-4' 
        />

        <input 
            type='number' 
            value={phone} 
            onChange={(e)=>setPhone(e.target.value)} 
            placeholder='Phone Number' 
            className='border border-gray-300 px-3 py-2 rounded-lg w-full mb-4' 
        />
        <input 
        type='text' 
        value={address} 
        onChange={(e)=>setAddress(e.target.value)} 
        placeholder='Address' 
        className='border border-gray-300 px-3 py-2 rounded-lg w-full mb-4' 
      />
      <div className='flex justify-between'>
        <button
          onClick={()=>{
            onClose()
            toast.success('Customer added successfully!')
          }}
          className="mt-4 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg"
         
        >
          Create
        </button>
        <button
          onClick={()=>{
            onClose()
            // toast.success('Customer added successfully!')
          }}
          className="mt-4 bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  )
}

export default AddCustomerModal