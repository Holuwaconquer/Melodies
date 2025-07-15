import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const MusicPage = () => {

  const location = useLocation();
  const music = location.state?.music;

  if(!music) return <div>No music data available</div>;


  return (
    <div>
      <h1>{music.title}</h1>
      <p>Artist: {music.user.name}</p>
    </div>
  )
}

export default MusicPage