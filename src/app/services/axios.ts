import Axios from 'axios';

const axios = Axios.create({
  baseURL:  '/api',
  // So axios.post('/auth/login') -> http://localhost:4000/api/auth/login
});

export default axios;