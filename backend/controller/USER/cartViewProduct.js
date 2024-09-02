const cartModel = require("./../../models/cartProduct");
const productModel = require('./../../models/productModel');
const userModel = require('./../../models/userModels');

const cartViewProduct = async (req, res) => {
    try {
        const sessionUserId = req.user._id; 
        const cartProducts = await cartModel.find({ userId: sessionUserId });
        const products = [];

        // Iterate through cart products and fetch related product details
        for (const cartProduct of cartProducts) {
            const product = await productModel.findById(cartProduct.productId);
            if (product) {
                // Only push product if it exists
                products.push(product);
            }
        }

        // Fetch user details
        const user = await userModel.findById(sessionUserId);
        const sendData = {
            cartProducts,
            products,
            user
        };

        res.status(200).json({
            success: true,
            message: 'Cart products fetched successfully',
            data: sendData,
            error: false
        });
    } catch (err) {
        console.error('Error fetching cart products:', err);
        res.status(400).json({
            success: false,
            message: err.message,
            data: [],
            error: true,
        });
    }
};

module.exports = cartViewProduct;
