const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');

exports.createUser = async (username, email, password) => {
  try {
    const userid = Date.now();
    await User.createusers(username, email, password, userid);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findUser(email);
    if (!user) {
      return { status: 401, message: 'User not found' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: 'Wrong password' };
    }
    return { status: 200, message: 'Login successful', user };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
