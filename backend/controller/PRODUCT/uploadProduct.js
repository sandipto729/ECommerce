const uploadProductModel = require("./../../models/productModel");
const uploadPermission = require('./../../helper/permission');

async function uploadProductController(req, res) {
    try {
        const sessionUserId = req.user._id;
        console.log('User ID:', sessionUserId);

        // Await the result of the permission check
        const hasPermission = await uploadPermission(sessionUserId);
        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access (only for admin)',
                data: null,
                error: true
            });
        }

        const uploadProduct = new uploadProductModel(req.body);
        const saveProduct = await uploadProduct.save();
        res.status(200).json({
            success: true,
            message: "Product uploaded successfully",
            data: saveProduct,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
            error: true
        });
    }
}

module.exports = uploadProductController;