import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { Link } from 'react-router-dom';

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

export default function Login() {
    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverUrl}/api/auth/login`, formData, { 
                withCredentials: true 
            });
            console.log('Login successful:', response.data);
            
            localStorage.setItem('user', JSON.stringify(response.data.user));
            getCurrentUser();
            navigate('/');
            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response ? error.response.data.message : "Login failed.";
            alert(errorMessage);
        }
    };

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            let user = response.user;
            let name = user.displayName;
            let email = user.email;

            const result = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
                name,
                email,
            }, { withCredentials: true });
            
            console.log('Google Login successful:', result.data);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            getCurrentUser();
            navigate('/');
            alert('Google Login successful!');
        } catch (error) {
            console.error('Google Login error:', error);
            const errorMessage = error.response ? error.response.data.message : "An error occurred.";
            alert(`Google Login failed: ${errorMessage}`);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex justify-center items-center p-8 font-['Poppins']">
            <img src={Logo} alt="Logo" className="absolute top-8 left-8 w-[100px] cursor-pointer" onClick={() => navigate('/')} />

            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-bold leading-tight">Welcome Back!</h1>
                    <p className="text-gray-300 mt-4 text-lg">
                        We're so excited to see you again. Enter your details to continue.
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
                    <div className="w-[400px] bg-[#1f293a]/30 p-8 rounded-2xl shadow-lg border border-[#2c4766]">
                        <form onSubmit={handleSubmit} className="w-full">
                            <h2 className="text-3xl text-[#0ef] text-center font-semibold mb-6">Login</h2>

                            <div className="relative my-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Email
                                </label>
                            </div>

                            <div className="relative my-4">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full h-[50px] bg-transparent border-2 border-[#2c4766] outline-none rounded-full text-base text-white px-5 transition-colors focus:border-[#0ef] valid:border-[#0ef]"
                                />
                                <label className="absolute top-1/2 left-5 -translate-y-1/2 text-base text-gray-400 pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:bg-[#1c2e42] peer-focus:px-1.5 peer-focus:text-[#0ef] peer-valid:top-0 peer-valid:text-xs peer-valid:bg-[#1c2e42] peer-valid:px-1.5 peer-valid:text-[#0ef]">
                                    Password
                                </label>
                                <div onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-xl text-gray-400 hover:text-white">
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </div>
                            </div>

                            <button type="submit" className="w-full h-[45px] bg-[#0ef] border-none outline-none rounded-full cursor-pointer text-base text-[#1f293a] font-semibold mt-4 hover:bg-cyan-500 transition-colors">
                                Login
                            </button>

                            <div className="mt-5 mb-2.5 text-center text-sm">
                                <p className="text-gray-300">
                                    Don't have an account?
                                    <Link to="/signup" className="text-base text-[#0ef] no-underline font-semibold ml-1 hover:underline">
                                        Register
                                    </Link>
                                </p>
                                <p className="text-gray-300 mt-2 flex items-center justify-center">
                                    Or login with
                                    <img src={google} alt="Google icon" className="w-[20px] h-[20px] inline ml-2 cursor-pointer" onClick={googleLogin} />
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
