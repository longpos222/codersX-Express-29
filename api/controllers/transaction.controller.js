const Transaction = require("../../models/transaction.model.js");
const User = require("../../models/user.model.js")
const Book = require("../../models/book.model.js")

module.exports.transactionsList = async (req, res) => {
  
  let transactionsList = await Transaction.find();
  const authUser = await User.findOne({email: req.email});

  if (!authUser.isAdmin) {
    transactionsList = await Transaction.find({ userId: authUser.id });
  }

  if(!transactionsList) return res.sendStatus(400)
  
  var finalTransList = await Promise.all(
    transactionsList.map(async function(tranx) {
      var id = tranx.id;      
      var mapUserName = await User.findOne({_id: tranx.userId });
      var userName = mapUserName.name;
      var mapBookTitle = await Book.findOne({_id: tranx.bookId });
      var bookTitle = mapBookTitle.title;
      var isComplete = tranx.isComplete;
      return {id, userName, bookTitle, isComplete};
    })
  );

  res.json(finalTransList)
};