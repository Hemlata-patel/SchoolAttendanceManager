import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // make sure this points to axios with baseURL set
import '../styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData, {
        withCredentials: true, // important to allow cookies
      });
      console.log('✅ Login successful:', response.data);
      onLogin(); // callback to parent App.jsx
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.msg || 'Try again'));
    }
  };

  return (
  <>
    <div className="form-container">
       <h1 className="main-title">School Attendance Manager</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={() => navigate('/register')} className="link-button">
            Register
          </button>
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginForm;
