const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    "sessionId": String,
    "userId": String,
    "cart": Object,
});

const Session = mongoose.model('Session', sessionSchema, "sessionsList");

module.exports = Session;