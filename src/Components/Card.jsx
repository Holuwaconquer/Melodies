import React, { useEffect, useRef, useState } from 'react'
import Cardimg from '../assets/bg-image.png'
import axios from 'axios'

const Card = ({ music, setCurrentTrack, setIsPlaying, currentTrack, isPlaying }) => {   


  const audioRef = useRef(null)

  const handlePlay = () => {
    const musicUrl = `https://api.audius.co/v1/tracks/${music.id}/stream`;

    if (currentTrack?.id === music.id) {
      // If this song is already playing, toggle
      setIsPlaying(!isPlaying);
    } else {
      // Otherwise, play new song
      setCurrentTrack({
        ...music,
        audioUrl: musicUrl,
      });
      setIsPlaying(true);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //   };
  // }, []);


  return (
    <>
      <div className='card'>
          <div className='cardImg'>
              <img src={music.artwork['150x150']} alt={music.artistName} /> 
          </div>
          <h4>{music.title}</h4>
          <p>{music.user.name}</p>

        <div className='playBtn'>
          <button onClick={handlePlay}>
            {!isPlaying ? '⏸' :'▶' } 
            </button>
        </div>
      </div>


    </>
  )
}

export default Card