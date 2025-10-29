import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';
function Nav() {
    let {getCurrentUser , userData} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let {showSearch,setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext)
    let [showProfile,setShowProfile] = useState(false)
    let navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
            console.log(result.data)
           
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='w-full h-20 bg-white/80 backdrop-blur-md z-10 fixed top-0 flex items-center justify-between px-6 shadow-lg shadow-gray-200'>

        <div className='flex items-center gap-4'>
            <img src={logo} alt='logo' className='w-10' />
<h1 class="text-2xl font-bold text-blue-600">OneCart</h1>
        </div>

        <div className='hidden md:flex'>
            <ul className='flex items-center gap-8'>
                <li><button onClick={() => navigate("/")} className='text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300'>HOME</button></li>
                <li><button onClick={() => navigate("/collection")} className='text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300'>COLLECTIONS</button></li>
                <li><button onClick={() => navigate("/about")} className='text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300'>ABOUT</button></li>
                <li><button onClick={() => navigate("/contact")} className='text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300'>CONTACT</button></li>
            </ul>
        </div>

        <div className='flex items-center gap-6 relative'>
            <button onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} className='text-gray-600 hover:text-gray-900'>
                {showSearch ? <IoSearchCircleSharp className='w-8 h-8' /> : <IoSearchCircleOutline className='w-8 h-8' />}
            </button>

            <div className='relative'>
                <button onClick={() => setShowProfile(prev => !prev)} className='flex items-center justify-center w-9 h-9 bg-gray-800 text-white rounded-full font-bold text-sm'>
                    {userData ? userData.name.slice(0, 1).toUpperCase() : <FaCircleUser className='w-6 h-6' />}
                </button>

                {showProfile && (
                    <div className='absolute w-48 bg-white shadow-lg rounded-lg top-12 right-0 border border-gray-200 z-20'>
                        <ul className='py-2 text-gray-700'>
                            {userData ? (
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>
                            ) : (
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>
                            )}
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
                        </ul>
                    </div>
                )}
            </div>

            <button onClick={() => navigate("/cart")} className='relative hidden md:block text-gray-600 hover:text-gray-900'>
                <MdOutlineShoppingCart className='w-8 h-8' />
                <p className='absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold'>{getCartCount()}</p>
            </button>
        </div>

        {showSearch && (
            <div className='absolute top-full left-0 w-full h-20 bg-white/90 backdrop-blur-md flex items-center justify-center'>
                <input
                    type="text"
                    className='w-full md:w-1/2 h-12 bg-gray-100 rounded-full px-6 placeholder-gray-500 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400'
                    placeholder='Search Here'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
        )}

        <div className='fixed bottom-0 left-0 w-full h-20 bg-white shadow-t-lg flex items-center justify-around text-xs text-gray-600 md:hidden'>
            <button className='flex flex-col items-center justify-center gap-1' onClick={() => navigate("/")}>
                <IoMdHome className='w-7 h-7' />
                <span>Home</span>
            </button>
            <button className='flex flex-col items-center justify-center gap-1' onClick={() => navigate("/collection")}>
                <HiOutlineCollection className='w-7 h-7' />
                <span>Collections</span>
            </button>
            <button className='flex flex-col items-center justify-center gap-1' onClick={() => navigate("/contact")}>
                <MdContacts className='w-7 h-7' />
                <span>Contact</span>
            </button>
            <button className='relative flex flex-col items-center justify-center gap-1' onClick={() => navigate("/cart")}>
                <MdOutlineShoppingCart className='w-7 h-7' />
                <span>Cart</span>
                <p className='absolute top-0 right-0 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold'>{getCartCount()}</p>
            </button>
        </div>
    
    </div>
  )
}

export default Nav
