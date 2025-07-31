import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/attendanceRecords.css';

const AttendanceRecords = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/attendance/records');
        setAttendanceList(res.data);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      {attendanceList.length === 0 ? (
        <p>No records found</p>
      ) : (
        attendanceList.map((record, index) => (
          <div key={index} className="record-table-wrapper">
            <h3>{new Date(record.date).toLocaleDateString()}</h3>
            <table className="record-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.records.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{entry.student ? entry.student.name : 'Unknown'}</td>
                    <td>{entry.student ? entry.student.rollNumber : 'N/A'}</td>
                    <td className={entry.status === 'Present' ? 'present' : 'absent'}>
                      {entry.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceRecords;
