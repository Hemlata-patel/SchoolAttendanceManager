import React, { useState } from 'react';
import api from '../api/api';
import '../styles/AddStudent.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await api.post('/students/add', formData, {
        withCredentials: true,
      });
      setMessage('✅ Student added successfully!');
      setFormData({ name: '', rollNumber: '', class: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add student.');
    }
  };

  return (
    <div className="form-container">
      <form className="add-student-form " onSubmit={handleSubmit}>
        <h2>Add New Student</h2>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddStudent;
