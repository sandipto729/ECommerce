const userModel = require('./../../models/userModels');

async function allUsers(req, res) {
  try {
    console.log('User ID:', req.user?._id); 
    const applyUser = await userModel.findById(req.user?._id);

    if (!applyUser || applyUser.role.toLowerCase() !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access (only for admin)',
        data: [],
        error: true,
      });
    }

    // Fetch and return all users or perform other actions as needed
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: [],
      error: true,
    });
  }
}

module.exports = allUsers;