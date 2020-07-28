const Session = require("../models/session.model.js");
const nanoid = require('nanoid');

module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = nanoid(24) ;
    await Session.findOneAndUpdate({"sessionId": sessionId },{ "sessionId": sessionId },{upsert: true});
    console.log(`${Date.now()} và ${sessionId}`);
    res.cookie("sessionId", sessionId, {
      signed: true
    });
  }
  
  next();
};
