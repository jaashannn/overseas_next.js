import { authMiddleware, roleMiddleware } from '../../middleware/authMiddleware';

const handler = async (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route', user: req.user });
};

export default authMiddleware(roleMiddleware(['admin', 'agent'])(handler));