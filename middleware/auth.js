const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const Authtoken = async (req, res, next) => {
  const authHeader = req.headers['authorization']; // Use lowercase 'authorization'
  const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer'

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    console.log('Received Token:', token); // Log token for debugging
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure the secret key is set correctly
    console.log('Decoded Payload:', decoded); // Log decoded payload for debugging

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
