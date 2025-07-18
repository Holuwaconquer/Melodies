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


const Sidenav = () => {
  return (
    <>
        <div className='sideNav'>
            <div className='sideBar'>
                <h1 className='logo'>Melodies</h1>
                <h4>Menu</h4>
                <div className='menuLink'>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/'><img src={Homeicon} alt={Homeicon} /><span>Home</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/discover'><img src={Discover} alt={Discover} /><span>Discover</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/trending-page'><img src={Albums} alt={Albums} /><span>Albums</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/artists'><img src={Artist} alt={Artist} /><span>Artists</span></NavLink>
                </div>
                <h4>Library</h4>
                <div className='menuLink'>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/recently-added'><img src={Recently} alt={Recently} /><span>Recently Added</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/most-played'><img src={MostPlayed} alt={MostPlayed} /><span>Most Played</span></NavLink>
                </div>
                <h4>Playlist and Favorite</h4>
                <div className='menuLink'>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/your-favorite'><img src={Favourite} alt={Favourite} /><span>Your Favourites</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/playlist'><img src={Playlist} alt={Playlist} /><span>Your Playlist</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/add-playlist'><img src={Addplaylist} alt={Addplaylist} /><span>Add Playlist</span></NavLink>
                </div>
                <h4>General</h4>
                <div className='menuLink'>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/settings'><img src={Settings} alt={Settings} /><span>Settings</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'homeLink active' : 'homeLink'} to='/logout'><img src={Logout} alt={Logout} /><span>Logout</span></NavLink>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidenav