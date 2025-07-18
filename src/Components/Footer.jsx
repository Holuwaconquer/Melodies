import React, { useState } from 'react'

const Footer = () => {
  return (
    <>
        <div className='footerSection hidden md:block'>
            <div className='footerContainer'>
                {/* about footer */}
                <div className='aboutFooter'>
                    <h1>About</h1>
                    <p style={{fontSize: '12px'}}>
                        Melodies is a website that has been created for over <span>5 year’s</span>  
                        now and it is one of the most famous music player website’s in 
                        the world. in this website you can listen and download songs for 
                        free. also of you want no limitation you can buy our <span className='coloredTxt2'>premium pass’s.</span> 
                    </p>
                </div>

                {/* melodies footer */}
                <div className='footerUl'>
                    <h1>Melodies</h1>
                    <ul>
                        <li>Song</li>
                        <li>Radio</li>
                        <li>Podcast</li>
                    </ul>
                </div>
                <div className='footerUl'>
                    {/* footer access */}
                    <h1>Access</h1>
                    <ul>
                        <li>Explore</li>
                        <li>Artists</li>
                        <li>Playlists</li>
                        <li>Albums</li>
                        <li>Trending</li>
                    </ul>
                </div>
                {/* footer contact */}
                <div className='footerUl'>
                    <h1>Contact</h1>
                    <ul>
                        <li>About</li>
                        <li>Policy</li>
                        <li>Social Media</li>
                        <li>Support</li>
                    </ul>
                </div>
                {/* footer logo */}
                <div>
                    <h1 className='logo'>Melodies</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer