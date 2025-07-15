import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Sidenav from './Components/Sidenav'
import Home from './Pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Discover from './Pages/Discover'
import Button from './Components/Button'
import Footer from './Components/Footer'
import AudioRail from './Components/AudioRail'
import MusicPage from './Pages/MusicPage'
import Artist from './Pages/Artist'
import Profile from './Pages/Profile'
import UserProfile from './Components/UserProfile'

export const apiDetails = createContext()

const App = () => {

  const [apiData, setApiData] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
      axios.get('https://api.audius.co/v1/tracks/trending')
      .then((response) => {
          setApiData(response.data.data || []);
          setisLoading(false);
      })
      .catch((error) => {
          console.error('Error fetching trending tracks:', error);
      })
      .finally(() => setisLoading(false));
      
    }, [])
  
  return (
    <>
    <div>
      <div className='main'>
        <Sidenav />
        <div className='mainContent'>
          <apiDetails.Provider value={apiData}>

          <Routes>
              <Route path='/' 
                element={<Home isLoading={isLoading} 
                apiData={apiData}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}/>}>
              </Route>
              <Route path='/discover' element={<Discover />}></Route>
              <Route path='/MusicPage' element={<MusicPage />}></Route>
              <Route path='/artists' element={<Artist />}></Route>
              <Route path='/home' element={<Navigate to='/' />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/profile/:id' element={<Profile />}></Route>
              {/* <Route path='/abc' element={<UserProfile />}></Route> */}
              {/* <Route path='/abc/:id' element={<UserProfile />}/> */}
              <Route path='*' element={<div className='text-center text-2xl'>Page Not Found</div>}></Route>
          </Routes>
          </apiDetails.Provider>  
          <Footer />
        </div>
        <AudioRail 
          currentTrack={currentTrack} 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying} 
        />
      </div>
    </div>
    </>
  )
}

export default App