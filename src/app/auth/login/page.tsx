'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';


const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormFilled = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-white rounded-md p-6 w-full max-w-md shadow-sm space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome Back!</h2>
        <p className="text-center">Kindly log in into your account</p>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-sm text-gray-700">Password</label>
          <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type={showPassword ? "text" :"password" }
            placeholder="*********"
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
          <button 
            type="button"
            onClick={toggleVisibility} 
            className="absolute right-3 top-[30px]"
          >
           {showPassword ? <EyeOff/> : <Eye/>}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          disabled={!isFormFilled}
          className={`w-full py-2 rounded-sm text-sm cursor-pointer ${
            isFormFilled
              ? "bg-rose-500 hover:bg-rose-600 text-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Log in
        </button>
        <p>
          Don’t have an account?{" "}
          <a href="/auth/signup">
            <span className="text-blue-700 underline cursor-pointer">Sign up</span>
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;