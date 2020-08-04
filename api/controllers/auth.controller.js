var bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../../models/user.model.js')

module.exports.postLogin = async function(req, res) {
  var authEmail = req.body.email;
  var authPassword = req.body.password;
  var user = await User.findOne({email: authEmail});

  if (!user) return res.sendStatus(400);
  
  const msg = {
    to: user.email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Security alert: new or unusual login",
    text: "Looks like there was a login attempt from a new device or location. Your account has been locked.", html: "<strong>Your account has been locked.</strong>"
  };

  if (!user.wrongLoginCount) {
    user.wrongLoginCount = 0;
  }

  if (user.wrongLoginCount >= 4) {
    sgMail.send(msg);
    return res.sendStatus(410);
  }

  if (!bcrypt.compareSync(authPassword, user.password)) {
    await User.findOneAndUpdate(
      {
        email: authEmail
      },
      { 
        wrongLoginCount: ++user.wrongLoginCount
      }
    );
    return res.sendStatus(410);
  }

  const accessTokenKey = jwt.sign(
    {email: authEmail},
    process.env.ACCESS_TOKEN_KEY,
    {expiresIn: '30s'}
  )

  const refreshTokenKey = jwt.sign(
    {email: authEmail},
    process.env.REFRESH_TOKEN_KEY
  )

  res.json({
    accessTokenKey: accessTokenKey,
    refreshTokenKey: refreshTokenKey
  });
};
