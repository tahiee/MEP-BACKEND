const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get the token from the request header
  // const token = req.header('x-auth-token');
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  // Debugging: Log token value
  console.log('Token received:', token);
  
  // Check if no token is found
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Debugging: Log decoded token
    console.log('Decoded token:', decoded);

    req.user = decoded.user;
    next();
  } catch (err) {
    // Debugging: Log error details
    console.error('Token verification error:', err);

    res.status(401).json({ message: 'Token is not valid' });
  }
};
