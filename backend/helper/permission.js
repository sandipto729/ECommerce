const userModel = require('./../models/userModels');

const uploadProductPermission = async (userId) => {
    const user = await userModel.findById(userId);
    if (user.role !== 'Admin') {
        return false;
    } else {
        return true;
    }
};

module.exports = uploadProductPermission;