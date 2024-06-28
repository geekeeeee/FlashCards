import React from 'react'
import Navbar from "../components/Navbar.jsx"
import './general.css'

const Home = () => {
  return (
    
    <div className="bg-hero h-screen text-center p-0 m-0">
      <Navbar/>
      <div className='absolute top-[200px] left-[100px] flex flex-col gap-0'>
        <div className="bg-txtt poppins-semibold text-white text-[60px] w-[490px] h-[200px] text-start p-0 m-0 bg-no-repeat">
        </div>
      </div>
    </div>
  )
}

export default Home
