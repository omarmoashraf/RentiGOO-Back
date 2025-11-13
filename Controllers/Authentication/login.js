const user = require('../../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-encode")
const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await user.findOne({ email: email } , '+password');
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, users.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt(
    {
      id: users._id,
      name: users.name,
      email: users.email,
    },
    process.env.SECRET_KEY
  );

    res.status(200).json({ message: "Login successful", user: users });

};




module.exports = login;
