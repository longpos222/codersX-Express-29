const Session = require("../models/session.model.js");
const nanoid = require('nanoid');

module.exports = async function(req, res, next) {
  
  var sessionId;
  if(!req.signedCookies.sessionId) {
    sessionId = nanoid(24);
    await Session.findOneAndUpdate(
      { "sessionId": sessionId },
      { "sessionId": sessionId, "cart": {} },
      { upsert: true});    
    res.cookie("sessionId", sessionId, {
      signed: true
    });
  }
  next();
};
