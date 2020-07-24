var shortid = require("shortid");

var db = require("../db");

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid();
    
    db.get("sessionList")
      .push({ id: sessionId })
      .write();
    
    res.cookie("sessionId", sessionId, {
      signed: true
    });
  }

  next();
};
