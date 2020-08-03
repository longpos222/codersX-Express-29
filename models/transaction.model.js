const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    "bookId": String,
    "userId": String,
    "isComplete": Boolean 
});

const Transaction = mongoose.model('Transaction', transactionSchema, "transactionsList");

module.exports = Transaction;