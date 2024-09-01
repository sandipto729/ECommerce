const productModel = require("../../models/productModel"); // Ensure correct import path

const getProductByIdController = async (req, res) => {
  try {
    const productId = req.body.productId; // Correctly extract productId from req.body
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null,
        error: true,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
      error: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      data: null,
      error: true,
    });
  }
};

module.exports = getProductByIdController;
