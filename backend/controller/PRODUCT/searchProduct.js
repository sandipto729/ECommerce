const productModel = require('../../models/productModel');

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q || ''; 
    const regex = new RegExp(query, 'i'); 

    const products = await productModel.find({
      $or: [
        { productName: regex },
        { productCategory: regex },
        { productDescription: regex },
      ],
    });

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
      error: false,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      data: null,
      error: true,
    });
  }
};

module.exports = searchProduct;
