const user = require('../../Models/user');
const bcrypt = require('bcryptjs');
const signup = async (req, res) => {};

const { username, email, password, role } = req.body;
const hashed_password = await bcrypt.hash(password, 8);
const newUser = new user({
  name: username,
  email: email,
  password: hashed_password,
  role: role
});
await newUser.save();
res.status(201).json({ message: "User registered successfully", user: newUser });


module.exports = signup;