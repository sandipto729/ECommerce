const userModel = require('./../models/userModels');

async function updateUser(req, res) {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
        data: null,
        error: true,
      });
    }

    // Find user by ID
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: true,
      });
    }

    // Prepare data for update, excluding fields like password
    const { password, ...updateData } = req.body;

    // Update user with validation
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // Run validators on update
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      data: null,
      error: true,
    });
  }
}

module.exports = updateUser;
