var Book = require("../../models/book.model.js")

module.exports.booksList = async (req, res) => {
  var booksList = await Book.find();
  res.json(booksList);
};

module.exports.addPOST = async function(req, res) {
    var isExists = await Book.find({title: req.body.title, desc: req.body.desc});
    var errors = []
    if (isExists.length != 0) {
      errors.push('This book is existed !')
      res.render("books/add",{
        errors: errors
      });
      return;
    }
  
    var newBooksList = await Book.insertMany(req.body);
  
    res.json(newBooksList);
};