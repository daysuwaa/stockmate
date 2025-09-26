import Axios from 'axios';

const axios = Axios.create({
  baseURL: "/api", // so axios.get("/auth/me") -> /api/auth/me
  headers: {
    "Content-Type": "application/json",
  }
});

export default axios;