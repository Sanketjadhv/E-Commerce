import React, { useEffect, useState ,useRef} from 'react'
import Nav from '../components/Nav'
import Background from './../components/Background';
import Hero from '../components/Hero';
import Product from './Product';
import OurPolicy from '../components/OurPolicy';
import Newletterbox from '../components/Newletterbox';
import Footer from '../components/Footer';
function Home() {
  let heroData = [
    {text1:"30% OFF Limited offer", text2:"Style that"},
    {text1:"Discover the best of bold fashion", text2:"Limited Time Only!"},
    {text1:"Explore our best Collection", text2:"Shop Now!"},
    {text1:"Choose your perfect Fasion Fit", text2:"Now on Sale!"}
  ]

  let [heroCount, setHeroCount] = useState(0)
  
  let intervalRef = useRef(null);

useEffect(() => {
  intervalRef.current = setInterval(() => {
    setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
  }, 3000);

  return () => clearInterval(intervalRef.current);
}, []);


  return (
    <>
    <div className='overflow-x-hidden relative top-[70px]'>
     <div className=' w-[100vw] h-[100vh] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
     <Nav/>
     <Background heroCount={heroCount}/>
     <Hero
     heroCount={heroCount}
     setHeroCount={setHeroCount}
     heroData={heroData[heroCount]}
     />   
      
    </div>
    <Product/>
    <OurPolicy/>
    <Newletterbox/>
    <Footer/>
    </div>
    </>
  )
}

export default Home