import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from './../assest/signin.gif';
import imageTobase64 from '../helper/imageTobase64';
import summeryAPI from '../common/index';
import { toast } from 'react-toastify';
import './Login.css'; // Reusing the same CSS file

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [profilePic, setProfilePic] = useState(LogoIcon);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        setShowPassword(false);
    }, []);

    const onSubmit = async (data) => {
        if (data.Password !== data.ConfirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const newData = {
            name: data.Name,
            email: data.Email,
            password: data.Password,
            profilePhoto: profilePic // Use the base64 image here
        };

        try {
            const response = await fetch(summeryAPI.signUP.url, {
                method: summeryAPI.signUP.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success(responseData.message);
                navigate('/login'); // Redirect to login page upon successful signup
            } else if (responseData.error === "User already exists") {
                toast.error("User already exists. Please login.");
                navigate('/login'); // Redirect to login page if user already exists
            } else {
                toast.error(responseData.message || "Signup failed");
            }
        } catch (error) {
            console.error("Error in signup:", error);
            toast.error("An error occurred during signup");
        }
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imagePic = await imageTobase64(file);
                console.log("Base64 image:", imagePic); // Check if image is converted properly
                setProfilePic(imagePic); // Update the profile picture with the uploaded image
            } catch (error) {
                console.error("Error converting image to base64:", error);
                toast.error("Error converting image to base64");
            }
        }
    };

    return (
        <div className="login-container">
            {isSubmitting && <div className="loader">Loading ...</div>}
            <div className="photodiv">
                <img src={profilePic} alt="Profile" style={{ height: '200px', borderRadius: '50%' }} />
                <div className="upload-photo">
                    <input
                        type="file"
                        onChange={handleUploadPic} // Handle image upload
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <div className="input-group">
                    <input
                        {...register("Name", { required: "Name is required" })}
                        placeholder='Full Name'
                        className="input-field"
                    />
                    {errors.Name && <span className="error-message">{errors.Name.message}</span>}
                </div>

                <div className="input-group">
                    <input
                        {...register("Email", { required: "Email is required" })}
                        placeholder='Email'
                        className="input-field"
                    />
                    {errors.Email && <span className="error-message">{errors.Email.message}</span>}
                </div>

                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("Password", { required: "Password is required" })}
                        placeholder='Password'
                        className="input-field"
                    />
                    {showPassword ?
                        <IoMdEye onClick={() => setShowPassword(false)} style={{ cursor: "pointer" }} /> :
                        <IoEyeOff onClick={() => setShowPassword(true)} style={{ cursor: "pointer" }} />}
                    {errors.Password && <span className="error-message">{errors.Password.message}</span>}
                </div>

                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("ConfirmPassword", { required: "Confirm Password is required" })}
                        placeholder='Confirm Password'
                        className="input-field"
                    />
                    {showPassword ?
                        <IoMdEye onClick={() => setShowPassword(false)} style={{ cursor: "pointer" }} /> :
                        <IoEyeOff onClick={() => setShowPassword(true)} style={{ cursor: "pointer" }} />}
                    {errors.ConfirmPassword && <span className="error-message">{errors.ConfirmPassword.message}</span>}
                </div>

                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
