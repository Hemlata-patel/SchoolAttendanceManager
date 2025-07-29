import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';

export const addStudent = async (req, res) => {
  const { name, rollNumber, class: className } = req.body;
  try {
    const student = new Student({ name, rollNumber, class: className, addedBy: req.userId });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('addedBy', 'username');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { date, students } = req.body;

    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ error: 'students array is required' });
    }

    // Convert rollNumbers to student IDs
    const records = [];

    for (const s of students) {
      const studentDoc = await Student.findOne({ rollNumber: s.rollNumber });
      if (!studentDoc) {
        return res.status(404).json({ error: `Student with roll number ${s.rollNumber} not found` });
      }
      records.push({
        student: studentDoc._id,
        status: s.status,
      });
    }

    const attendance = new Attendance({
      date,
      records,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('records.student', 'name rollNumber') // populate student name & rollNumber
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
