import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  let heroData=[
    {text1:"30% OFF Limited Offer",text2:"Style that"},
    {text1:"Discover the Best of Bold Fashion",text2:"Limited Time Only!"},
    {text1:"Explore Our Best Collection ",text2:"Shop Now!"},
    {text1:"Choose your Perfect Fasion Fit",text2:"Now on Sale!"}
  ]

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },3000);
    return () => clearInterval(interval)
  },[])
  
  return (
<div class="min-h-screen bg-gray-100">
    <div class="relative w-full h-screen bg-gradient-to-r from-gray-800 to-black">
        <Backgound heroCount={heroCount} />
        <div class="absolute inset-0 flex items-center justify-center">
            <Hero
                heroCount={heroCount}
                setHeroCount={setHeroCount}
                heroData={heroData[heroCount]}
            />
        </div>
    </div>
    <div class="py-16">
        <Product />
    </div>
    <div class="bg-white py-16">
        <OurPolicy />
    </div>
    <div class="py-16">
        <NewLetterBox />
    </div>
    <Footer />
</div>
  )
}

export default Home
