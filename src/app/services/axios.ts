import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api',
  // So axios.post('/auth/login') -> http://localhost:4000/api/auth/login
});

export default axios;