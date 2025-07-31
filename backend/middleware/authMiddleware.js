import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id; // depending on your payload
    next();
  } catch {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


