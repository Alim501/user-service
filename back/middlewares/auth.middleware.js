const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await userService.getUserById(decoded.id);
    if (!user || user.status === 'blocked') {
      return res.status(401).json({ message: 'User not found or blocked' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;