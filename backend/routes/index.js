const express = require('express');
const router = express.Router();
const userSignUpController = require('./../controller/USER/userSignup');
const userSigninController = require('./../controller/USER/userSignin');
const userDetailsController = require('./../controller/USER/userDetails');
const authToken = require('./../middlewares/authToken');
const userLogOut = require('./../controller/USER/userLogOut');
const allUsers = require('./../controller/USER/allUsers');
const updateUser = require('./../controller/USER/updateUser'); // Import the updateUser controller
const uploadProductController = require('./../controller/PRODUCT/uploadProduct'); // Import the uploadProduct controller
const allProduct=require('./../controller/PRODUCT/getProduct');
const updateProduct=require('./../controller/PRODUCT/updateProduct');
const catagoryProduct=require('./../controller/PRODUCT/getCatagoryProduct');


router.post('/signup', userSignUpController);
router.post('/signin', userSigninController);
router.get('/user-details', authToken, userDetailsController);
router.post('/logout', userLogOut);

// Admin panel
router.post('/all-users', authToken, allUsers);
router.put('/update-user',updateUser);
router.post('/upload-product', authToken,uploadProductController);

//product
router.get('/get-product',allProduct);
router.post('/update-product',authToken,updateProduct);
router.post('/get-catagoryProduct',catagoryProduct);

module.exports = router;
