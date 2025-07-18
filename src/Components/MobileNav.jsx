import React from 'react'
import { NavLink } from 'react-router-dom'
import Homeicon from '../assets/vector.svg'
import Albums from '../assets/album.svg'
import Recently from '../assets/fluent-mdl2_recent.svg'
import Artist from '../assets/artist.svg'
import Discover from '../assets/discover.svg'
import Favourite from '../assets/favourite.svg'
import MostPlayed from '../assets/mostplayed.svg'
import Playlist from '../assets/playlist.svg'
import Addplaylist from '../assets/addplaylist.svg'
import Settings from '../assets/settings.svg'
import Logout from '../assets/logout.svg'


const MobileNav = () => {
  return (
    <>
      <div style={{padding: '10px 30px'}} className='MobileNav bg-[#0F0F0F] md:hidden z-[10000] w-full absolute rounded-tl-[30px] rounded-tr-[30px] bottom-0 left-0'>
        <div className='bottomBar w-full'>
          <div className='mobileMenuLink w-full flex items-center justify-between'>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/'><img src={Homeicon} alt={Homeicon} /><span>Home</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/discover'><img src={Discover} alt={Discover} /><span>Discover</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/trending-page'><img src={Albums} alt={Albums} /><span>Albums</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'MobileLink active' : 'MobileLink'} to='/artists'><img src={Artist} alt={Artist} /><span>Artists</span></NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNav