import React, { useContext, useState } from 'react'
import BgImage from '../assets/bg-image.png'
import { apiDetails } from '../App'
import Genre from '../Components/Genre'
import PopularArtist from '../Components/PopularArtist'
import Mood from '../Components/Mood'

const Discover = ({trendNum, trendMusic, currentTrack, setCurrentTrack, isPlaying, setIsPlaying, apiData}) => {
  
  const [first, setfirst] = useState(null)
  
  return (
    <>
      <h1 style={{color: 'white'}} className='topSongTitle'>Music <span className='coloredTxt'>Genres</span> </h1>
      <div style={{}} className='w-full'>
        <Genre />
      </div>
      <h1 style={{color: 'white'}} className='topSongTitle'>Mood <span className='coloredTxt'>Playlist</span> </h1>
      <div style={{}} className='topCardContainer w-full'>
        <Mood />
      </div>
      <PopularArtist 
          trendNum={trendNum}
          trendMusic={trendMusic}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying} 
          apiData={apiData}
      />
    </>
  )
}

export default Discover