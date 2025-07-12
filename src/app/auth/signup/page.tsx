'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-wite  rounded-md p-6 w-full max-w-md shdow-sm space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome to StockMate 😃</h2>
        <p className='text-center'>Kindly Sign up into your account</p>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm text-gray-700">Business Name</label>
          <input
            type="name"
            placeholder="Luxury Hairs"
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="johndoe@email.com"
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="*********"
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>

         <button
         type="button" 
        onClick={() => router.push("/pages/dashboard")}
        className="w-full  bg-rose-500 hover:bg-rose-600 text-black py-2 rounded-sm text-sm cursor-pointer"
      >
       Sign up
      </button>
      <p>Already have an account? <a href='/auth/login'><span className='text-blue-700 underline cursor-pointer'> Login</span></a></p>
      </form>
    </div>
  );
};

export default SignUpPage;