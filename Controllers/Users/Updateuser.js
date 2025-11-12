const User = require("../../Models/user");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;  // user ID from URL
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password }, // fields to update
      { new: true }              // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

module.exports = updateUser;
