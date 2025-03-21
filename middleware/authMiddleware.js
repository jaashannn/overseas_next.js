import { verifyToken } from '../lib/auth';

export const authMiddleware = (handler) => async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};