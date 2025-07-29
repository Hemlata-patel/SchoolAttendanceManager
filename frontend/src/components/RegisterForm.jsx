import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/styles.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful');
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

return (
  <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
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
      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <button
          type="button"
          className="link-button"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </p>
    </form>
  </div>
);
};

export default RegisterForm;