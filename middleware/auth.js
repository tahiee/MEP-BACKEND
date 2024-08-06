const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const Authtoken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have the secret key
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = Authtoken;
