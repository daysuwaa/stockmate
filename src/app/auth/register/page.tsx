'use client';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, } from '@/app/redux/slices/authSlice';
import { AppDispatch } from '@/app/redux/store/store';
import { RootState } from '@/app/redux/store/store';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () =>{
  setShowPassword(!showPassword);
  }
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);
  
    const onSubmit = async(e:React.FormEvent) => {
      e.preventDefault();
      const result = await dispatch(registerUser({name, email, password, phone: Number(phone), website}));
      console.log(result);
      if (registerUser.fulfilled.match(result)) {
        router.push('/dashboard');
         toast.success('Signed in successfully :)', {id:"toastidd-sucess"})
      }
      if(registerUser.rejected.match(result)){
            toast.error('Inavlid Details, try again')
          }
          if(registerUser.pending.match(result)){
            toast.loading('loading..');
          }
    }
    const isFormFilled = email.trim() !== '' && password.trim() !== '';
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <form onSubmit={onSubmit} className="bg-wite  rounded-md p-6 w-full max-w-xl bg-white shadow-gray-200 shadow-lg space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome to StockMate 😃</h2>
        <p className='text-center'>Kindly Sign up into your account</p>

        <div className='flex gap-6'>
        <div className="flex w-full flex-col">
          <label htmlFor="name" className="text-sm text-gray-700">Business Name</label>
          <input
            type="name"
            placeholder="Luxury Hairs"
            value={name}
             onChange={(e)=> setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="email" className="text-sm text-gray-700">Email</label>
          <input
            type="email"
             value={email}
            placeholder="johndoe@email.com"
             onChange={(e)=> setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
             value={phone}
            placeholder="+234 901 2346 789"
             onChange={(e)=> setPhone(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-sm mt-1 text-sm placeholder:text-[13px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-700">Website(Optional)</label>
          <input
            type="text"
             value={website}
            placeholder="www.stockmate.co"
             onChange={(e)=> setWebsite(e.target.value)}
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
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!isFormFilled}
          className={`w-full py-2 rounded-sm text-sm cursor-pointer ${
            isFormFilled
              ? "bg-rose-500 hover:bg-rose-600 text-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
         {status === 'loading'
         ? 'logging in'
         : 'Sign Up'}
        </button>
      <p>Already have an account? <a href='/auth/login'><span className='text-blue-700 underline cursor-pointer'> Login</span></a></p>
      </form>
    </div>
  );
};

export default SignUpPage;