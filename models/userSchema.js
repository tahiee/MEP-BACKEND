// models/userSchema.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: Number,
    unique: true,
    required: true,
  },
}, {
  timestamps: true
});

UserSchema.statics.createusers = async function (username, email, password, userid) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this({ username, email, password: hashedPassword, userid });
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

UserSchema.statics.findUser = async function (email) {
  try {
    return await this.findOne({ email });
  } catch (error) {
    throw new Error('Error finding user: ' + error.message);
  }
};

module.exports = mongoose.model("User", UserSchema);
