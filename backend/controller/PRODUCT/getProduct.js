const productModel=require('./../../models/productModel');
const getProductController = async (req, res) => {
    try{
        const allProducts = await productModel.find().sort({createdAt: -1}); 

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: allProducts,
            error: false
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            data: null,
            error: true
        });
    }
}
module.exports = getProductController