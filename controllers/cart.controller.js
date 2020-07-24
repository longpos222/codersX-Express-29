var db = require("../db");
var shortid = require('shortid')

module.exports.addToCart = (req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  var count = db
    .get("sessionList")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  db.get("sessionList")
    .find({ id: sessionId })
    .set("cart." + bookId, count + 1)
    .write();

  res.redirect("/books");
};

module.exports.borrowAll = function (req, res) {
  
  var booksIdList = db.get('sessionList')
      .find({id: req.signedCookies.sessionId})
      .get('cart')
      .value()
  
  for ( var bookId in booksIdList) {
    console.log(Date() +" la : " + bookId)
   db.get("transactionsList")
    .push({
      id: shortid(),
      bookId: bookId,
      userId: req.signedCookies.userId
    })
    .write();
        console.log(Date() +" la : " + bookId)
 }

  res.redirect("/transactions");
}