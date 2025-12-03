const User = require('../../Models/user'); 
const bcrypt = require('bcrypt');
const jwt = require("jwt-encode");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

  
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY is not defined in env variables");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt(payload, process.env.SECRET_KEY);

    res.status(200).json({
      message: "Login successful",
      token,
      user: payload, // safer to return plain object
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
