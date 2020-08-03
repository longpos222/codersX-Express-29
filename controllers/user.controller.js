const User = require("../models/user.model.js")
const Book = require("../models/book.model.js")
const Session = require("../models/session.model.js")

const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name        : process.env.CLOUDINARY_CLOUD_NAME,
  api_key           : process.env.CLOUDINARY_API_KEY,
  api_keyapi_secret : process.env.CLOUDINARY_API_SECRET
});

module.exports.usersList = async function(req, res) {
  var pageNumber = parseInt(req.query.page) || 1;
  var perPage = 2;
  res.render("users/users-list", {
    usersList: await User.find().limit(perPage).skip((pageNumber-1)*perPage),
    pageNumber: pageNumber.toString()
  });
};

module.exports.add = function(req, res) {
  res.render("users/add");
};

module.exports.addPOST = async function(req, res) {
  var [newUser] = await User.insertMany({
    name: req.body.name,
    phone: req.body.phone,
    avatarUrl: ""
  });
  
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      public_id:  newUser._id + "_avatar",
      invalidate: true
    },
    async (error, result) => {
      await User.findOneAndUpdate({name: req.body.name},{
          avatarUrl: result.url
        })
      res.redirect("/users");
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
};

module.exports.update = async function(req, res) {
  currentNameID = req.params._id;
  currentName = await User.findOne({_id: currentNameID});
  
  res.render("users/update-name", {
    currentNameID: currentNameID,
    currentName: currentName.name
  });
};

module.exports.updatePOST = async function(req, res) {
  var id = req.params._id;
  await User.findOneAndUpdate({_id: id},{name: req.body.name});
  res.redirect("/users");
};

module.exports.delete = async function(req, res) {
  const a = await User.findByIdAndDelete(req.params._id)
  res.redirect("/users");
};

module.exports.profile = async function(req, res) {
  const authUser = await User.findOne({_id: req.signedCookies.userId});
  const booksList = await Book.find();
  const booksListAddedToCard = await Session.findOne({userId:req.signedCookies.userId})
  var booksListCartId = Object.keys(booksListAddedToCard.cart);
  
  var booksListCart = await Promise.all(
    booksListCartId.map(async function(bookId) {
      var Id = bookId;
      var book = await Book.findOne({_id: bookId});
      var coverUrl = book.coverUrl;
      var title = book.title;
      var desc = book.desc;
      
      return { Id, coverUrl,title, desc };
    })
  );

  res.render("users/profile", {
    currentName: authUser.name,
    currrentAvatarUrl: authUser.avatarUrl,
    currentEmail: authUser.email,
    currentPhone: authUser.phone,
    booksList: booksListCart
  });
};

module.exports.avatar = async function(req, res) {
  const authUser = await User.findOne({_id: req.signedCookies.userId});
  res.render("users/avatar", {
    currentName: authUser.name,
    currrentAvatarUrl: authUser.avatarUrl
  });
};

module.exports.avatarPOST = async function(req, res) {
  const authUser = await User.findOne({_id: req.signedCookies.userId});

  let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        public_id: authUser._id + "_avatar",
        invalidate: true
      },
      async (error, result) => {
        await User.findOneAndUpdate({ _id: req.signedCookies.userId },{ avatarUrl: result.url })
        res.redirect("/users/profile");
      }
    );
  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
};