const User = require("../../models/user.model.js");

module.exports.usersList = async (req, res) => {
  const authUser = await User.findOne({email: req.email});
  if (!authUser.isAdmin) return res.sendStatus(404);
  let usersList = await User.find();
  res.json(usersList);
};

module.exports.addUser = async function(req, res) {
  var isExists = await User.find({email : req.body.email });
  if (isExists.length != 0) return res.status(404).send("This User is existed.");
  var newUser = await User.insertMany(req.body);
  res.json(newUser);
};

module.exports.getUserById = async function(req, res) {
  const authUser = await User.findOne({email: req.email});
  var id = req.params._id;
  if (!authUser.isAdmin) return res.sendStatus(404);

  let usersList = await User.findById(id);

  res.json(usersList);
};

module.exports.updateUser = async function(req, res) {
  var id = req.params._id;
  var avatarUrl = req.body.avatarUrl;
  var authUser = await User.findOne({email: req.email});
  var user = await User.findById(id);

  if (authUser.isAdmin || authUser == user) {
    var updatedUser = await User.findByIdAndUpdate(id, {avatarUrl: avatarUrl}, {new: true});
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).send("You don't have right to update this user.");
  }
};

module.exports.deleteUser = async function(req, res) {
  var id = req.params._id;
  var authUser = await User.findOne({email: req.email});
  var user = await User.findById(id);

  if (authUser.isAdmin || authUser == user) {
    await User.findOneAndDelete({_id: id});
    return res.status(200).send(`The User is deleted.`);
  } else {
    return res.status(404).send("You don't have right to update this user.");
  }
};