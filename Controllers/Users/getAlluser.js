const User = require("../../Models/user");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

module.exports = getAllUser;
