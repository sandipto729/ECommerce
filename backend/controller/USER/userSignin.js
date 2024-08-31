const bcrypt = require('bcryptjs');
const userModel = require('./../../models/userModels');
const jwt = require('jsonwebtoken');

const userSigninController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Signin attempt with email:", email);

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                error: true,
                success: false
            });
        }

        const findUser = await userModel.findOne({ email: email.toLowerCase() });

        if (!findUser) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }

        const tokenData = {
            _id: findUser._id,
            email: findUser.email
        };

        const token = jwt.sign(
            { data: tokenData }, 
            process.env.TOKEN_SECRET_KEY, 
            { expiresIn: '1h' } 
        );

        const tokenOptions = {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict' // Adjust as needed
        };

        res.cookie('token', token, tokenOptions).json({
            message: "Signin successful",
            data: token,
            error: false,
            success: true
        });

    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = userSigninController;