const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    userid: {
        type: String,
        unique: false,
        default: null,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;