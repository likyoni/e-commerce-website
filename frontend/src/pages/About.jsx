import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg' 
import NewLetterBox from '../component/NewLetterBox'

// Define the new, softer color palette
const PRIMARY_TEXT_COLOR = '#00204a'; // Dark Midnight Blue (dark black)
const BACKGROUND_COLOR = '#e6f7ff'; // Very Light Sky Blue
const ACCENT_COLOR = '#007acc'; // Vibrant Ocean Blue

// --- Icon Components with new color scheme ---
const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
const ConvenienceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
);
const ServiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

function About() {

  return (
    // Set background to light blue and default text to dark black/blue
    <div className={`w-[99vw] min-h-screen flex items-center justify-center flex-col bg-[${BACKGROUND_COLOR}] gap-[80px] pt-[80px] pb-[40px] font-["Poppins"] text-[${PRIMARY_TEXT_COLOR}]`}>
      
      {/* 1. About Us Section */}
      <Title text1={'ABOUT'} text2={'US'}/>
      <div className='w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center px-4'>

        {/* Image Side - Clean, soft shadow */}
        <div className='lg:w-1/2 w-full flex items-center justify-center p-4'>
          <img 
            src={about} 
            alt="About OneCart" 
            className={`w-[85%] lg:w-[90%] rounded-xl shadow-xl shadow-gray-400 transition-all duration-500 hover:scale-[1.03] border-4 border-[${ACCENT_COLOR}]/20`}
          />
        </div>
        
        {/* Text Content Side */}
        <div className='lg:w-1/2 w-[90%] max-w-lg lg:max-w-none flex flex-col items-start justify-center gap-6 mt-10 lg:mt-0 lg:p-4'>
          <p className='w-full text-base leading-relaxed text-gray-700'>
            <span className={`text-xl font-extrabold text-[${ACCENT_COLOR}]`}>OneCart</span> was born for smart, seamless shopping—created to deliver **quality products**, **trending styles**, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='w-full text-base leading-relaxed text-gray-600'>
            We cater to **modern shoppers**—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a **customer-first shopping experience** you’ll love.
          </p>
          
          <h3 className={`text-2xl text-[${ACCENT_COLOR}] font-bold mt-4 border-b-2 border-[${ACCENT_COLOR}]/50 pb-1`}>
            Our Mission
          </h3>
          <p className='w-full text-base italic text-gray-700'>
            Our mission is to **redefine online shopping** by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>
      
      {/* 2. Why Choose Us Section */}
      <div className='w-full flex flex-col items-center justify-center gap-10 mt-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        <div className='w-[90%] max-w-6xl flex flex-col lg:flex-row gap-6 justify-center items-center py-10'>

          {/* Cards - Light background with a strong blue hover */}
          <div className={`group lg:w-1/3 w-full h-[300px] border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-center bg-white shadow-lg transition-all duration-300 hover:bg-[${ACCENT_COLOR}] hover:text-white hover:border-[${ACCENT_COLOR}] cursor-pointer`}>
            <QualityIcon />
            <b className={`text-2xl font-semibold text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`}>Quality Assurance</b>
            <p className='text-gray-700 group-hover:text-white transition-colors'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>
          
          <div className={`group lg:w-1/3 w-full h-[300px] border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-center bg-white shadow-lg transition-all duration-300 hover:bg-[${ACCENT_COLOR}] hover:text-white hover:border-[${ACCENT_COLOR}] cursor-pointer`}>
            <ConvenienceIcon />
            <b className={`text-2xl font-semibold text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`}>Convenience</b>
            <p className='text-gray-700 group-hover:text-white transition-colors'>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>
          
          <div className={`group lg:w-1/3 w-full h-[300px] border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-center bg-white shadow-lg transition-all duration-300 hover:bg-[${ACCENT_COLOR}] hover:text-white hover:border-[${ACCENT_COLOR}] cursor-pointer`}>
            <ServiceIcon />
            <b className={`text-2xl font-semibold text-[${ACCENT_COLOR}] group-hover:text-white transition-colors`}>Exceptional Customer Service</b>
            <p className='text-gray-700 group-hover:text-white transition-colors'>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>
      
      {/* 3. Newsletter Component */}
      <NewLetterBox/>
      
    </div>
  )
}

export default About