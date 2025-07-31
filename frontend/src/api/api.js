// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://schoolattendancemanager.onrender.com/api', // ✅ correct base
  withCredentials: true                 // ✅ for sending cookies
});

export default api;
