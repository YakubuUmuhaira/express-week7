const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { validateAddUser } = require("../validations/userValidations");
const getToken = require("../utils/getToken");

const addUser = async (req, res) => {
  //validate a user
  const { error } = validateAddUser.validate(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  //complexity level and hashing using bcrypt
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //find user from db
  const emailFound = await User.findOne({ email: req.body.email });
  if (emailFound) return res.status(403).send("email already exist");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: getToken(newUser._id),
  });
};

const userLogin = async (req, res) => {
  //staff verification
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Account does not exist");

  //password verification
  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!verifiedPassword)
    return res.status(404).send("email does not match with password");

  // res.header("authorization", token_id).send(token_id);

  // res.json({ staff });
  res.status(202).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:getToken(user._id)
  })
};

module.exports = { addUser, userLogin };