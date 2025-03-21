export const roleMiddleware = (roles) => (handler) => async (req, res) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return handler(req, res);
  };