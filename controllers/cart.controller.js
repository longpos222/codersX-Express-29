const Session = require("../models/session.model.js");
const Transaction = require("../models/transaction.model.js");
module.exports.addToCart = async (req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  var isExists = await Session.findOne({"sessionId": sessionId, [`cart.${bookId}`]: {$exists : true}});
  
  if(!isExists) {
    await Session.findOneAndUpdate({sessionId: sessionId},{$set: {[`cart.${bookId}`] : 0 }});
  }

  await Session.findOneAndUpdate({sessionId: sessionId},{$inc: {[`cart.${bookId}`] : 1 }});

  res.redirect("/books");
};

module.exports.borrowAll = async function (req, res) {
  const userId = req.signedCookies.userId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findOne({sessionId: sessionId});
  var booksIdList = Object.keys(session.cart)

  for(let id of booksIdList){
    let c ={
      userId: userId,
      bookId: id,
      isComplete: true
    }
    await Transaction.insertMany(c)
  }
  //TAKENOTE
  
  res.redirect("/transactions");
}