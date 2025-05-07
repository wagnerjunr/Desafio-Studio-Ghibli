import axios from "axios";

const api = axios.create({
  baseURL: 'https://ghibliapi.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
