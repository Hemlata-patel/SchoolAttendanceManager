import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/attendanceForm.css';

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/students/all', { withCredentials: true });
        setStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (rollNumber, status) => {
    setAttendanceData(prev => ({ ...prev, [rollNumber]: status }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.keys(attendanceData).length === 0) {
      return alert("Please mark attendance for at least one student.");
    }

    const today = new Date().toISOString().split('T')[0];

    const payload = {
      date: today,
      students: Object.entries(attendanceData).map(([rollNumber, status]) => ({
        rollNumber,
        status,
      })),
    };

    try {
      const res = await api.post('/attendance/mark', payload, {
        withCredentials: true,
      });
      alert(res.data.message);
      setAttendanceData({});
    } catch (err) {
      console.error('Attendance marking failed:', err);
      alert('Error marking attendance');
    }
  };

  return (
    <div className="attendance-form-wrapper">
      <form onSubmit={handleSubmit} className="attendance-form">
        <h2>📅 Mark Attendance - {new Date().toLocaleDateString()}</h2>
        {students.map(student => (
          <div key={student._id} className="student-row">
            <label>{student.rollNumber} - {student.name}</label>
            <select
              value={attendanceData[student.rollNumber] || ''}
              onChange={e => handleChange(student.rollNumber, e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
