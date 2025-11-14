const User = require("../../Models/user");
const bcrypt=require("bcrypt")
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        data: null,
      });
    }
    const dashed_pass=await bcrypt.hash(password,10)

    // Create new user
    const newUser = new User({
      name,
      email,
      password:dashed_pass,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      data: {
        id:newUser.name,
        email:newUser.email,
      },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};

module.exports = addUser;