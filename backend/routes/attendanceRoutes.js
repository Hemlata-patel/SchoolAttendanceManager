import express from 'express';
import { addStudent, markAttendance, getAttendance, getAllStudents } from '../controllers/attendanceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mark', verifyToken, markAttendance);
router.get('/records', verifyToken, getAttendance);

export default router;
