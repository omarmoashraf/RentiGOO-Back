const User = require("../../Models/user");
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        data: null,
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      data: newUser,
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
