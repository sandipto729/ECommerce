const cartModel = require("./../../models/cartProduct");
const countCartProduct= async (req, res) => {
    try{
        const sessionUserId = req.user._id;
        let countProduct=0;

        const cartProducts = await cartModel.find({userId: sessionUserId});
        for(const cartProduct of cartProducts){
            countProduct += cartProduct.quantity;
        }

        res.status(200).json({
            success: true,
            message: 'Cart product count fetched successfully',
            data: countProduct,
            error: false
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
            data: [],
            error: true,
        });
    }
}

module.exports = countCartProduct   