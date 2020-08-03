const Transaction = require("../models/transaction.model.js");
const User = require("../models/user.model.js")
const Book = require("../models/book.model.js")

module.exports.transactionsList = async (req, res) => {
  
  let transactionsList = await Transaction.find();
  const authUser = await User.findOne({_id: req.signedCookies.userId});

  if (!authUser.isAdmin) {
    transactionsList = await Transaction.findOne({ userId: authUser.id });
  }

  var mapUserName = async function(userId) {
    var user =  await User.findOne({_id: userId })
    return user.name;
  };

  var mapBookTitle = async function(bookId) {
    var book =  await Book.findOne({_id: bookId })
    return book.title;
  };
  var finalTransList = await Promise.all(
    transactionsList.map(async function(tranx) {
      var id = tranx.id;      
      var mapUserName = await User.findOne({_id: tranx.userId });
      var userName = mapUserName.name;
      var mapBookTitle = await Book.findOne({_id: tranx.bookId });
      var bookTitle = mapBookTitle.title;
      var isComplete = tranx.isComplete;
      return {id, userName, bookTitle, isComplete };
    })
  );

  res.render("transactions/transactions-list", {
    transactionsList: finalTransList
  });
};

module.exports.create = async function(req, res) {
  const users = await User.find();
  const books = await Book.find();
  res.render("transactions/create", {
    books,
    users
  });
};

module.exports.createPOST = async function(req, res) {
  await Transaction.findOneAndUpdate(
    {
      bookId: req.body.bookId,
      userId: req.body.userId
    },
    {
      bookId: req.body.bookId,
      userId: req.body.userId
    },
    {
      upsert: true
    })
  
  res.redirect("/transactions");
};

module.exports.complete = async function(req, res, next) {
  try {
    var idExist = await Transaction.findOne({_id: req.params._id})
    await Transaction.findOneAndUpdate({_id: req.params._id},{isComplete: true})
    res.redirect("/transactions");
  } catch (err) {
    next(err);
  }
};
