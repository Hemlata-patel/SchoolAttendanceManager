import express from 'express';
import { register, login } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ msg: 'Logged out successfully' });
});

router.get('/check', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, username: decoded.username });
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
});

export default router;
