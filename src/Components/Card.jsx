import React, { useEffect, useRef, useState } from 'react'
import Cardimg from '../assets/bg-image.png'
import axios from 'axios'

const Card = ({ music }) => {   

  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  const playMusic = () =>{
    const musicUrl = `https://api.audius.co/v1/tracks/${music.id}/stream`
    if(isPlaying){
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false)
    }else{
      audioRef.current = new Audio(musicUrl);
      audioRef.current.crossOrigin = 'anonymous';
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPlaying(true)

      audioRef.current.onended = () =>{
        setIsPlaying(false)
      }
    }
  }
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);


  return (
    <>
      <div className='card'>
          <div className='cardImg'>
              <img src={music.artwork['150x150']} alt={music.artistName} /> 
          </div>
          <h4>{music.title}</h4>
          <p>{music.user.name}</p>

        <div className='playBtn'>
          <button onClick={playMusic}>
            {isPlaying ? '⏸' :'▶' } 
            </button>
        </div>
      </div>


    </>
  )
}

export default Card