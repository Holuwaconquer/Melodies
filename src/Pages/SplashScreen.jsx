import React from 'react'
import IntroBg from '../assets/introBg.png'
import keyBg from '../assets/keyboardBg.jpg'
import loadingSpinner from '../assets/spinner.png'

const SplashScreen = () => {
  return (
    <div className='w-[100vw] h-[100vh]' style={{background: `linear-gradient(to bottom, rgba(24, 24, 24, 0.80), rgba(24, 24, 24, 0.80)), url(${keyBg}) center center no-repeat`, backgroundSize: 'cover'}}>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <img src={IntroBg} alt="" />
        <p className='text-white text-[24px] flex items-center gap-4'><span>Loading</span><span><img className='loadingImg' src={loadingSpinner} alt="" /></span></p>
      </div>
    </div>
  )
}

export default SplashScreen