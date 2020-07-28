var Book = require("../models/book.model.js")

module.exports.booksList = async (req, res) => {
  var booksList = await Book.find();
  res.render("books/books-list", {
    booksList: booksList,
  });
};

module.exports.add = function(req, res) {
  res.render("books/add");
};

module.exports.addPOST = async function(req, res) {
//Chỗ nỳ sao thỉnh thoảng bị add db 2 lần dubble
  var newBooksList = await Book.findOneAndUpdate(
    {title: req.body.title},
    {title: req.body.title, desc: req.body.desc},
    {upsert: true},
    function (error, success) {
      if (error) {
          console.log(`Error: ${error}`);
      } else {
          console.log("Result: " + success);
      }
    }  
  )

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
  await Book.findOneAndDelete({_id: req.params._id})
  res.redirect("/books");
};

module.exports.updatePOST = async function(req, res) {
  await Book.findOneAndUpdate(
    {_id: req.params._id},
    {title: req.body.title}
  );
  res.redirect("/books");
};
