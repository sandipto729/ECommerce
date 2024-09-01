const cartModel = require("./../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const sessionUserId = req.user._id;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        const findProduct = await cartModel.findOne({ productId: productId, userId: sessionUserId });

        if (findProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product already in cart',
                data: null,
                error: true
            });
        }

        const payload = {
            productId,
            quantity,
            userId: sessionUserId
        };

        const newCart = new cartModel(payload);
        const saveCart = await newCart.save();
        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            data: saveCart,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            data: [],
            error: true,
        });
    }
};

module.exports = addToCartController;