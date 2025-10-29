import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
// import React, { useState, useContext } from 'react';
// import { MemoryRouter, Link } from 'react-router-dom';
// import axios from 'axios';
// import { auth } from '../../utils/Firebase.js';
// import { signInWithPopup } from 'firebase/auth';
// import { provider } from '../../utils/Firebase.js';

// Import the real context
// import { authDataContext } from '../context/AuthDataContext.jsx';
// Mock Logo Import (as in original)
// const Logo = 'https://placehold.co/100x40/0c2025/0ef?text=LOGO';


// --- SVG Icon Components ---
const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
    </svg>
);

// const google = 'https://placehold.co/20x20/ffffff/000000?text=G';

// --- Registration Component (Frontend Only) ---
export default function Register() {
    const { serverUrl } = useContext(authDataContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${serverUrl}/api/auth/registration`, {
                name,
                email,
                password,
            }, { withCredentials: true });
            
            console.log('Registration successful:', response.data);
            alert('Registration successful!');

        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response ? error.response.data.message : "An error occurred.";
            alert(`Registration failed: ${errorMessage}`);
        }
    };

    const googleSignup = async () => {
        try {
                const responce = await signInWithPopup(auth,provider)
                let user = responce.user
                let name = user.displayName;
                let email = user.email

                const reult = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
                    name,
                    email,
                }, { withCredentials: true });
                console.log('Google signup successful:', reult.data);
                alert('Google signup successful!'); 
                
        }
        catch (error) {
            console.error('Google signup error:', error);
            const errorMessage = error.response ? error.response.data.message : "An error occurred.";
            alert(`Google signup failed: ${errorMessage}`);
        }
    }



    return (
        <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex justify-center items-center p-8 font-['Poppins']">
            <img
                src={Logo}
                alt="Logo"
                className="absolute top-8 left-8 w-[100px] cursor-pointer"
            />

            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-16">
                {/* Left Side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-bold leading-tight">Create Your Account</h1>
                    <p className="text-gray-300 mt-4 text-lg">
                        Join our community and start your journey with us. It only takes a minute!
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
                    <div className="w-[400px] bg-[#1f293a]/30 p-8 rounded-2xl shadow-lg border border-[#2c4766]">
                        <form onSubmit={handleSubmit} className="w-full">
                            <h2 className="text-3xl text-[#0ef] text-center font-semibold mb-6">
                                Register
                            </h2>

                            {/* Full Name */}
                            <div className="relative my-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Full Name
                                </label>
                            </div>

                            {/* Email */}
                            <div className="relative my-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Email
                                </label>
                            </div>

                            {/* Password */}
                            <div className="relative my-4">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Password
                                </label>
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-xl text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative my-4">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Confirm Password
                                </label>
                                <div
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-xl text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full h-[45px] bg-[#0ef] border-none outline-none rounded-full cursor-pointer text-base text-[#1f293a] font-semibold mt-4 hover:bg-cyan-500 transition-colors"
                            >
                                Register
                            </button>

                            {/* Links */}
                            <div className="mt-5 mb-2.5 text-center text-sm">
                                <p className="text-gray-300">
                                    Already have an account?
                                    <Link
                                        to="/login"
                                        className="text-base text-[#0ef] no-underline font-semibold ml-1 hover:underline"
                                    >
                                        Login
                                    </Link>
                                </p>
                                <p className="text-gray-300 mt-2 flex items-center justify-center">
                                    Or register with
                                    <img
                                        src={google}
                                        alt="Google icon"
                                        className="w-[20px] h-[20px] inline ml-2 cursor-pointer"
                                        onClick={googleSignup}
                                    />
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
