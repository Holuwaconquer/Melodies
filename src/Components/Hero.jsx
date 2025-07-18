import React from 'react'
import Search from '../assets/search.svg'
import { Link } from 'react-router-dom'
import Button from './Button'

const Hero = ({ btnClassName, btnTitle}) => {
  return (
    <>
        <div className='heroSection hidden md:block'>
            <div className='heroContainer'>
              <div className='topNav gap-0 md:gap-[15px]'>
                {/* for search bar */}
                <div className='searchBar w-100'>
                  <div className='searchField'>
                    <img src={Search} alt={Search} />
                    <input type="text" placeholder='Search for Music, Artist...'/>
                  </div>
                </div>

                {/* for middle link */}
                <div className='topnavLink hidden md:gap-4 md:flex md:items-center '>
                  <Link to='/aboutUs'>About Us</Link>
                  <Link to='/contact'>Contact</Link>
                  <Link to='/premium'>Premium</Link>
                </div>
              </div>
              {/* hero content */}
              <div className='heroContentSection'>
                <div className='heroContent w-[100%] md:w-[45%]'>
                  <h1 className='font-bold'>All the <span className='coloredTxt'>Best Songs</span> in One Place</h1>
                  <p>On our website, you can access an amazing collection of popular and new songs.
                     Stream your favorite tracks in high quality and enjoy without 
                    interruptions. Whatever your taste in music, we have it all for you!
                  </p>
                  <div className='heroBtn flex flex-col items-center justify-start gap-1 md:flex md:flex-row md:items-center md:justify-start md:gap-[24px]'>
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