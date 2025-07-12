'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-wite  rounded-md p-6 w-full max-w-md shdow-sm space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome Back!</h2>
        <p className='text-center'>Kindly log in into your account</p>

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
        onClick={() => router.push("/dashboard")}
        className="w-full  bg-rose-500 hover:bg-rose-600 text-black py-2 rounded-sm text-sm cursor-pointer"
      >
        Log in
      </button>
      <p>Dont have an account? <a href='/auth/signup'><span className='text-blue-700 underline cursor-pointer'> Sign up</span></a></p>
      </form>
    </div>
  );
};

export default Login;