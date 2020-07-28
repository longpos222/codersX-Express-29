const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "name": String,
    "phone": String,
    "email": String ,
    "password": String,
    "isAdmin": Boolean,
    "wrongLoginCount": Number,
    "avatarUrl": String, 
});

const User = mongoose.model('User', userSchema, "usersList");

module.exports = User;