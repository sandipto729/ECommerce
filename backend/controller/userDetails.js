const userModel = require('./../models/userModels');

async function userDetailsController(req, res) {
    try {
        const userId = req.user._id; 
        console.log('User ID:', userId);

        const findUser = await userModel.findById(userId);
        console.log('User:', findUser);

        res.json({
            success: true,
            message: 'User details fetched successfully',
            data: findUser,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            data: null,
            error: true,
        });
    }
}

module.exports = userDetailsController;
