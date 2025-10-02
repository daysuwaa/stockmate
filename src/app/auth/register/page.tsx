'use client';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, } from '@/app/redux/slices/authSlice';
import { AppDispatch } from '@/app/redux/store/store';
import { RootState } from '@/app/redux/store/store';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Logo from '@/app/components/Logo';

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
   <div  className="min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white px-4">
    <Logo/>
    <div className=" flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 w-full mt-[7rem] max-w-lg shadow-xl border border-purple-100 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome to StockMate</h2>
        <p className='text-center'>Sign up into your account</p>

        <div className='flex gap-6'>
        <div className="flex w-full flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="name"
            placeholder="John Doe Enterprises"
            value={name}
             onChange={(e)=> setName(e.target.value)}
           className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
             value={email}
            placeholder="johndoe@email.com"
             onChange={(e)=> setEmail(e.target.value)}
           className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
             value={phone}
            placeholder="+234 (80) 1234-5678"
             onChange={(e)=> setPhone(e.target.value)}
           className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Website(Optional)</label>
          <input
            type="text"
             value={website}
            placeholder="www.johndoe.co"
             onChange={(e)=> setWebsite(e.target.value)}
           className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

       <div className="flex flex-col relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
            type={showPassword ? "text" :"password" }
            placeholder="*********"
           className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
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
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
         {status === 'loading'
         ? (<span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </span>)
         : 'Sign Up'}
        </button>
      <p>Already have an account? {' '}
        <a href='/auth/login'>
        <span className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"> 
          Login
        </span>
      </a>
    </p>
      </form>
      </div>
    </div>
  );
};

export default SignUpPage;