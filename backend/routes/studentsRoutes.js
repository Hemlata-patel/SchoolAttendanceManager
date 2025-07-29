import express from 'express';
import { addStudent, getAllStudents } from '../controllers/attendanceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyToken, addStudent);
router.get('/all', verifyToken, getAllStudents);

export default router;
