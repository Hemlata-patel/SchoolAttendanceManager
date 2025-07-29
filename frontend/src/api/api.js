// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ correct base
  withCredentials: true                 // ✅ for sending cookies
});

export default api;
