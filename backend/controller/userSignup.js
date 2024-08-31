const userModel = require('./../models/userModels');
const bcrypt = require('bcrypt');

async function userSignUpController(req, res) {
    try {
        const data = req.body;

        // Log incoming data for debugging
        console.log("Received data:", data);

        // Check if the user already exists
        const user = await userModel.findOne({ email: data.email });

        if (user) {
            return res.json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        // Ensure the password field exists
        if (!data.password) {
            return res.status(400).json({
                message: "Password is required",
                error: true,
                success: false
            });
        }

        // Hash the password with a salt rounds of 10
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Create a new user with profile photo
        const newUser = new userModel({
            name: data.name,
            email: data.email,
            password: data.password,
            profilePhoto: data.profilePhoto ,
            role: 'General'
        });
        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Error in user signup:", err);
        res.status(500).json({
            message: "Something went wrong",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
