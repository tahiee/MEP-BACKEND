const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/auth");
const User = require('../models/userSchema');

router.get("/test", (req, res) => {
  res.json({
    message: "Hello test",
  });
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findUser(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    await createUser(username, email, password); // Call the createUser function from auth controller
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await login(email, password);
    res.status(response.status).json({ message: response.message, user: response.user });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
