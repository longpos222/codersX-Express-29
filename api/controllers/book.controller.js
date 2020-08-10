var Book = require("../../models/book.model.js");

module.exports.booksList = async (req, res) => {
  var booksList = await Book.find();
  res.json(booksList);
};

module.exports.addBook = async function(req, res) {
  var isExists = await Book.find({
    title: req.body.title,
    desc: req.body.desc
  });
  if (isExists.length != 0) return res.status(404).send("This tranx is existed.");
  var newBook = await Book.insertMany(req.body);
  res.json(newBook);
};

module.exports.getBookById = async function(req, res) {
  var id = req.params._id;
  var book = await Book.findById(id);
  if (!book) {
    return res.sendStatus(404);
  }
  return res.status(200).json(book);
};

module.exports.updateBook = async function(req, res) {
  var id = req.params._id;
  var title = req.body.title;
  var book = await Book.findById(id);
  if (!book) {
    return res.sendStatus(404);
  }
  var newBook = await Book.findByIdAndUpdate(id, {title: title}, {new: true});
  return res.status(200).json(newBook);
};

module.exports.deleteBook = async function(req, res) {
  var id = req.params._id;
  var book = await Book.findById(id);
  if (!book) {
    return res.sendStatus(404);
  }
  await Book.findOneAndDelete({_id: id});
  return res.status(200).send(`The book title: "${book.title}" is deleted.`);
};