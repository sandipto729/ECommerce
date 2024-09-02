const cartModel=require('./../../models/cartProduct');

const cartEdit = async (req, res) => {
    try {
        const sessionUserId = req.user._id;
        const { productId, quantity } = req.body;
        const cartProduct = await cartModel.findOne({ productId: productId, userId: sessionUserId });
        if (cartProduct) {
            cartProduct.quantity = quantity;
            await cartProduct.save();
            res.status(200).json({
                success: true,
                message: 'Cart product updated successfully',
                data: cartProduct,
                error: false
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Cart product not found',
                data: null,
                error: true
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update cart product',
            data: null,
            error: true
        });
    }
};
module.exports = cartEdit;