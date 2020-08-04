const User = require('../../models/user.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.requireAuth = async function(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(
    token, 
    process.env.ACCESS_TOKEN_KEY, 
    (err, email) => {
      if (err) return res.sendStatus(403);
      req.email = email.email;
      next(); 
    }
  )
};
