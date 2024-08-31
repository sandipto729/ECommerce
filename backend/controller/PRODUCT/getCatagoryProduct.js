const productModel = require('./../../models/productModel');

const getCatagoryProduct = async (req, res) => {
  try {
    const productCatagory = await productModel.distinct('productCategory');
    console.log('ProductCatagory:', productCatagory);

    // Array to store one product from each category
    const productByCatagory = [];
    for (const catagory of productCatagory) {
      const products = await productModel.find({ productCategory: catagory });
      if (products.length > 0) {
        const obj = { catagory, products };
        productByCatagory.push(obj);
      }
    }
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: productByCatagory,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      data: null,
      error: true,
    });
  }
};

module.exports = getCatagoryProduct;
