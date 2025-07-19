import React from 'react'
import { NavLink } from 'react-router-dom'
import Homeicon from '../assets/Vector.svg'
import Albums from '../assets/album.svg'
import Artist from '../assets/artist.svg'
import Discover from '../assets/discover.svg'


const MobileNav = () => {
  return (
    <>
      <div style={{padding: '10px 30px'}} className='MobileNav fixed bg-[#0F0F0F] lg:hidden z-[10000] w-full rounded-tl-[30px] rounded-tr-[30px] bottom-0 left-0 py-2 px-[30px]'>
        <div className='bottomBar w-full'>
          <div className='mobileMenuLink w-full flex items-center justify-between'>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/'><img src={Homeicon} alt="Home" /><span>Home</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/discover'><img src={Discover} alt="Discover" /><span>Discover</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/trending-page'><img src={Albums} alt="Albums" /><span>Albums</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/artists'><img src={Artist} alt="Artists" /><span>Artists</span></NavLink>
          </div>
        </div>
      </div>

    </>
  )
}

export default MobileNav