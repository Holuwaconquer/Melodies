import React from 'react'
import Search from '../assets/search.svg'
import { Link } from 'react-router-dom'
import Button from './Button'

const Hero = ({ btnClassName, btnTitle}) => {
  return (
    <>
        <div className='heroSection hidden lg:block'>
            <div className='heroContainer'>
              <div className='topNav gap-0 lg:gap-[15px]'>
                {/* for search bar */}
                <div className='searchBar w-100'>
                  <div className='searchField'>
                    <img src={Search} alt={Search} />
                    <input type="text" placeholder='Search for Music, Artist...'/>
                  </div>
                </div>

                {/* for middle link */}
                <div className='topnavLink hidden lg:gap-4 lg:flex lg:items-center '>
                  <Link to='/aboutUs'>About Us</Link>
                  <Link to='/contact'>Contact</Link>
                  <Link to='/premium'>Premium</Link>
                </div>
              </div>
              {/* hero content */}
              <div className='heroContentSection'>
                <div className='heroContent w-[100%] lg:w-[45%]'>
                  <h1 className='font-bold'>All the <span className='coloredTxt'>Best Songs</span> in One Place</h1>
                  <p>On our website, you can access an amazing collection of popular and new songs.
                     Stream your favorite tracks in high quality and enjoy without 
                    interruptions. Whatever your taste in music, we have it all for you!
                  </p>
                  <div className='heroBtn flex flex-col items-center justify-start gap-1 lg:flex lg:flex-row lg:items-center lg:justify-start lg:gap-[24px]'>
                    <Button btnClassName="discoverBtn" btnTitle="Discover Now" />
                    <Button btnClassName="playListBtn" btnTitle="Create Playlist"/>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Hero