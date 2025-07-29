import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StudentList from './components/StudentList';
import AttendanceForm from './pages/AttendanceForm';
import Navbar from './components/Navbar';
import api from './api/api';
import AddStudent from './pages/AddStudents';
import AllStudents from './pages/AllStudents';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // prevent flicker

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get('/auth/check', { withCredentials: true });
        if (res.data.loggedIn) {
          setLoggedIn(true);
        }
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) return <div>Loading...</div>; // or a spinner

  return (
    <>
      {loggedIn && <Navbar onLogout={() => setLoggedIn(false)} />}
      <Routes>
        <Route
          path="/login"
          element={
            loggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={() => setLoggedIn(true)} />
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <>
                <StudentList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/mark-attendance" element={<AttendanceForm />} />
         <Route path="/add" element={<AddStudent />} />
         <Route path="/students" element={<AllStudents />} />
      </Routes>
    </>
  );
};

export default App;
