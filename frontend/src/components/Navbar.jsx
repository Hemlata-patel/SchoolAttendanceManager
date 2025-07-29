import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎓 Attendance Manager</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/mark-attendance">Mark Attendance</Link> 
        <Link to="/add">Add Student</Link>
        <Link to="/students">All Students</Link>
        {/* <button onClick={() => navigate('/add')} className="nav-button">Add Student</button>
        <button onClick={() => navigate('/students')} className="nav-button">Show Students</button> */}
        <button onClick={handleLogout} className="nav-button logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
