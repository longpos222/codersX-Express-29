const Transaction = require("../../models/transaction.model.js");
const User = require("../../models/user.model.js");
const Book = require("../../models/book.model.js");

module.exports.transactionsList = async (req, res) => {
  
  let transactionsList = await Transaction.find();
  const authUser = await User.findOne({email: req.email});

  if (!authUser.isAdmin) {
    transactionsList = await Transaction.find({ userId: authUser.id });
  }

  if(!transactionsList) return res.sendStatus(400);
  
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

  res.json(finalTransList);
};

module.exports.addTranx = async function(req, res) {
  var isExists = await Transaction.find({
    userId : req.body.userId,
    bookId : req.body.bookId
  });
  if (isExists.length != 0) return res.status(404).send("This tranx is existed.");
  var newTranx = await Transaction.insertMany(req.body);
  res.json(newTranx);
};

module.exports.getTranxById = async function(req, res) {
  var id = req.params._id;
  var tranx = await Transaction.find({_id:id});
  if (!tranx) {
    return res.sendStatus(404);
  }

  let transactionsList = await Transaction.find();
  var authUser = await User.findOne({email: req.email});
  if (!authUser.isAdmin) {
    transactionsList = await Transaction.find({ userId: authUser.id, _id : id });
  }
  
  if(transactionsList.length == 0) {
    res.status(400).send(" Your account do not have rights to access this tranx.");
    return;
  }
  
  let transactionsListFilter = await Transaction.find({_id : id });

  var finalTransList = await Promise.all(
    transactionsListFilter.map(async function(tranx) {
      var id = tranx.id;      
      var mapUserName = await User.findOne({_id: tranx.userId });
      var userName = mapUserName.name;
      var mapBookTitle = await Book.findOne({_id: tranx.bookId });
      var bookTitle = mapBookTitle.title;
      var isComplete = tranx.isComplete;
      return {id, userName, bookTitle, isComplete};
    })
  );
  return res.status(200).json(finalTransList);
};

module.exports.updateTranx = async function(req, res) {
  var id = req.params._id;
  var tranx = await Transaction.findById(id);
  if (tranx.isComplete) return res.status(404).send("This tranx is already set complete.");
  var updatedTranx = await Transaction.findByIdAndUpdate(id, {isComplete: true}, {new: true});
  return res.status(200).json(updatedTranx);
};

module.exports.deleteTranx = async function(req, res) {
  var id = req.params._id;
  var tranx = await Transaction.findById(id);
  if (!tranx) {
    return res.sendStatus(404);
  }
  await Transaction.findOneAndDelete({_id: id});
  return res.status(200).send(`The tranx is deleted.`);
};