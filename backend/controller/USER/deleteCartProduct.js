const cartModel = require("./../../models/cartProduct");

const deleteCartProduct = async (req, res) => {
  try {
    const sessionUserId = req.user._id;
    const productId = req.body.productId;

    // Log the input values for debugging
    console.log('Received Product ID:', productId);
    console.log('Received User ID:', sessionUserId);

    // Validate if sessionUserId and productId are valid
    if (!sessionUserId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID or Product ID is missing',
        data: null,
        error: true
      });
    }

    // Find the cart product by user ID and product ID
    const cartProduct = await cartModel.findOne({ userId: sessionUserId, productId: productId });

    // Check if the cart product exists
    if (cartProduct) {
      // Use deleteOne method
      await cartModel.deleteOne({ _id: cartProduct._id });
      res.status(200).json({
        success: true,
        message: 'Cart product deleted successfully',
        data: null,
        error: false
      });
    } else {
      // Cart product not found
      res.status(404).json({
        success: false,
        message: 'Cart product not found',
        data: null,
        error: true
      });
    }
  } catch (err) {
    // Log the error for debugging
    console.error('Error in deleteCartProduct:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete cart product',
      data: null,
      error: true
    });
  }
};

module.exports = deleteCartProduct;
