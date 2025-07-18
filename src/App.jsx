import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Sidenav from './Components/Sidenav'
import Home from './Pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Discover from './Pages/Discover'
import Button from './Components/Button'
import Footer from './Components/Footer'
import AudioRail from './Components/AudioRail'
import Artist from './Pages/Artist'
import Profile from './Pages/Profile'
import TrendingPage from './Pages/TrendingPage'
import { ToastContainer, toast } from 'react-toastify'
import MobileNav from './Components/MobileNav'

export const apiDetails = createContext()

const App = () => {

  let errorShown = false;
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
          console.error('Error fetching trending tracks:', error.message);
          if(!errorShown){
            if(error.message === 'Network Error'){
              toast.error('There is a Network Error, pls check your internet connection!', {
                hideProgressBar: true,
                autoClose: 5000
              })
            }else{
              toast.error('An error occured !')
            }
            errorShown = true
          }

      })
      .finally(() => setisLoading(false));
      
    }, [])
  
  return (
    <>
    <div>
      <ToastContainer />
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
              <Route path='/artists' element={<Artist apiData={apiData} />}></Route>
              <Route path='/home' element={<Navigate to='/' />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/profile/:id' element={<Profile />}></Route>
              <Route 
                path='/trending-page' 
                element={<TrendingPage currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying} />}  
                >
              </Route>
              <Route path='*' element={<div className='text-center text-2xl'>Page Not Found</div>}></Route>
          </Routes>
          </apiDetails.Provider>  
          <Footer />
        </div>
        <AudioRail 
          currentTrack={currentTrack} 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentTrack={setCurrentTrack} 
          trackList={apiData}
        />
        <MobileNav />
      </div>
    </div>
    </>
  )
}

export default App