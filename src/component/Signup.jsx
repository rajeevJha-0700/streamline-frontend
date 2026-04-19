// components/UserSignup.jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from '../config/axiosInstance.js';

import { login } from "../store/slice/authslice.js";

import Input from "./Input.jsx";
import Button from "./Button.jsx";

function UserSignup() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();

    const onSubmit = async (data) => {
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("fullname", data.fullname);
            formData.append("password", data.password);
            if (data.avatar && data.avatar[0]) {
                formData.append("avatar", data.avatar[0]);
            }

            const response = await axiosInstance.post(
                '/api/v1/user/registration',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            const createdUser = response.data?.data || response.data?.user || response.data;

            dispatch(login(createdUser));
            localStorage.setItem("auth", "true");
            localStorage.setItem("user", JSON.stringify(createdUser))
            navigate('/profile'); // Redirect to profile

        } catch (err) {
            console.error("Signup Error:", err);
            const errorMessage = err.response?.data?.message || 
                                err.response?.data?.error || 
                                "Failed to create account. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                    
                    {/* Header with StreamLine Branding */}
                    <div className="px-10 pt-12 pb-8 text-center">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/30">
                            <span className="text-white text-4xl font-bold">S</span>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-white tracking-tight">Join StreamLine</h1>
                        <p className="text-gray-400 mt-3 text-lg">
                            Create your account and start streaming
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-10 pb-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-sm flex items-center gap-3">
                                <span className="text-xl">⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            
                            <Input 
                                label="Full Name"
                                placeholder="Enter your full name"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500"
                                labelClassName="text-gray-300"
                                {...register("fullname", { 
                                    required: "Full name is required" 
                                })}
                                error={errors.fullname?.message}
                            />

                            <Input 
                                label="Username"
                                placeholder="Choose a unique username"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500"
                                labelClassName="text-gray-300"
                                {...register("username", { 
                                    required: "Username is required",
                                    minLength: { 
                                        value: 3, 
                                        message: "Username must be at least 3 characters" 
                                    }
                                })}
                                error={errors.username?.message}
                            />

                            <Input 
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500"
                                labelClassName="text-gray-300"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email"
                                    }
                                })}
                                error={errors.email?.message}
                            />

                            <Input 
                                label="Password"
                                type="password"
                                placeholder="Create a strong password"
                                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500"
                                labelClassName="text-gray-300"
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { 
                                        value: 6, 
                                        message: "Password must be at least 6 characters" 
                                    }
                                })}
                                error={errors.password?.message}
                            />

                            <Input 
                                label="Profile Picture (Optional)"
                                type="file"
                                accept="image/*"
                                className="bg-white/5 border-white/20 text-white file:bg-red-600 file:text-white file:border-0 file:rounded-xl file:px-4 file:py-2"
                                labelClassName="text-gray-300"
                                {...register("avatar")}
                                error={errors.avatar?.message}
                            />

                            <Button 
                                type="submit" 
                                disabled={loading}
                                loading={loading}
                                className="w-full py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all rounded-2xl shadow-lg shadow-red-600/40 mt-4"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-10 py-8 bg-black/30 border-t border-white/10 text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link 
                                to="/login" 
                                className="text-red-500 font-semibold hover:text-red-400 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Trust Badge */}
                <p className="text-center text-xs text-gray-500 mt-8 flex items-center justify-center gap-2">
                    <span>🔒</span>
                    Secured by StreamLine • Your data is safe with us
                </p>
            </div>
        </div>
    );
}

export default UserSignup;