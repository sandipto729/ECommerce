import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import './Login.css';
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from './../assest/signin.gif';
import { toast } from 'react-toastify';
import summeryAPI from '../common/index';
import Context from './../context/index'; // Import your context

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const generalContext = useContext(Context);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(summeryAPI.signIn.url, {
                method: summeryAPI.signIn.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            const dataApi = await response.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                if (generalContext && generalContext.setUserData) {
                    generalContext.setUserData(dataApi.data);
                } else {
                    console.error("setUserData is not available in context");
                }
                navigate('/');
            } else {
                toast.error(dataApi.message || "Failed to login");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="photodiv">
                <img src={LogoIcon} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <div className="input-group">
                    <input 
                        {...register("email", { required: "Email is required" })} 
                        placeholder="Email" 
                        className="input-field"
                        aria-label="Email"
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="input-group">
                    <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: "Password is required" })} 
                        placeholder="Password" 
                        className="input-field"
                        aria-label="Password"
                    />
                    {showPassword ? (
                        <IoMdEye 
                            onClick={() => setShowPassword(false)} 
                            style={{ cursor: "pointer" }} 
                            aria-label="Hide password" 
                        />
                    ) : (
                        <IoEyeOff 
                            onClick={() => setShowPassword(true)} 
                            style={{ cursor: "pointer" }} 
                            aria-label="Show password" 
                        />
                    )}
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;
