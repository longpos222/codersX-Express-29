const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    "title": String,
    "desc": String, 
});

const Book = mongoose.model('Book', bookSchema, "booksList");

module.exports = Book;