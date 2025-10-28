'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, } from '@/app/redux/slices/authSlice';
import { Eye, EyeOff } from 'lucide-react';
import { AppDispatch } from '@/app/redux/store/store';
import { RootState } from '@/app/redux/store/store';
import {toast} from "react-hot-toast"
import Logo from '@/app/components/common/Logo';


const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) => state.auth.status);
  // const error = useSelector((state: RootState) => state.auth.error);

  const onSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({email, password}));
    console.log(result);
    if (loginUser.fulfilled.match(result)) {
      router.push('/routes/dashboard');
     toast.success('Logged in successfully :)', {id:"toastid-sucess"})
    }
    if(loginUser.rejected.match(result)){
      toast.error('Inavlid Details, try again')
    }
    if(loginUser.pending.match(result)){
      toast.loading('loading..');
    }
   
  }
  const isFormFilled = email.trim() !== '' && password.trim() !== '';


  return (
<div  className="min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white px-4">
  <div className='p-5'>
  <Logo/>
  </div>
    <div className=" flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full mt-[10rem] max-w-md shadow-xl border border-purple-100 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600">Log in to manage your inventory</p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all pr-12"
            />
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={toggleVisibility}
              className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormFilled}
          onClick={onSubmit}
          className={`w-full py-3.5 cursor-pointer rounded-lg font-semibold text-white transition-all transform ${
            isFormFilled
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logging in...
            </span>
          ) : (
            'Log In'
          )}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;