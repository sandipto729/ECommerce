const productModel = require('./../models/productModel');
const uploadPermission = require('./../helper/permission');


async function updateProductController(req, res) {
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

        const productId = req.body._id;
        const updateProduct = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                data: null,
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updateProduct,
            error: false
        });

    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            data: null,
            error: true
        });
    }
}

module.exports = updateProductController;
