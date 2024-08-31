const express = require('express');
const router = express.Router();
const userSignUpController = require('./../controller/userSignup');
const userSigninController = require('./../controller/userSignin');
const userDetailsController = require('./../controller/userDetails');
const authToken = require('./../middlewares/authToken');
const userLogOut = require('./../controller/userLogOut');
const allUsers = require('./../controller/allUsers');
const updateUser = require('./../controller/updateUser'); // Import the updateUser controller
const uploadProductController = require('./../controller/uploadProduct'); // Import the uploadProduct controller
const allProduct=require('./../controller/getProduct');
const updateProduct=require('./../controller/updateProduct');


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

module.exports = router;
