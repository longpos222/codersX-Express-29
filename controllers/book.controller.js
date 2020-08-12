var Book = require("../models/book.model.js");

module.exports.booksList = async (req, res) => {
  try {
    var booksList = await Book.find();
    var a; 
    a.b();
    res.render("books/books-list", {
      booksList: booksList,
    });
  } catch (error) {
    res.render('errors/500.pug');
  }
};

module.exports.add = function(req, res) {
  res.render("books/add");
};

module.exports.addPOST = async function(req, res) {
  var isExists = await Book.find({title: req.body.title, desc: req.body.desc});
  var errors = [];
  if (isExists.length != 0) {
    errors.push('This book is existed !');
    res.render("books/add",{
      errors: errors
    });
    return;
  }

  var newBooksList = await Book.findOneAndUpdate(
    {title: req.body.title},
    {title: req.body.title, desc: req.body.desc},
    {upsert: true}, 
  );

  res.redirect("/books");
};

module.exports.update = async function(req, res) {
  const currentBookID = req.params._id;
  const currentTitle = await Book.findOne({_id: currentBookID}, 'title');
  res.render("books/update-title", {
    currentBookID: currentBookID,
    currentTitle: currentTitle.title,
  });
};

module.exports.delete = async function(req, res) {
  await Book.findOneAndDelete({_id: req.params._id});
  res.redirect("/books");
};

module.exports.updatePOST = async function(req, res) {
  await Book.findOneAndUpdate(
    {_id: req.params._id},
    {title: req.body.title}
  );
  res.redirect("/books");
};
