import React, { useEffect, useState } from 'react'
import Trending from '../Components/Trending'
import { useLocation, useNavigate } from 'react-router-dom'
import BackArrow from '../assets/back-arrow.png'
import TrendImage from '../assets/trending.png'
import AudioRail from '../Components/AudioRail'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Topnav from '../Components/Topnav'

const TrendingPage = ({ currentTrack, setCurrentTrack, isPlaying, setIsPlaying}) => {
  const location = useLocation()
  const [trendMusic, setTrendMusic] = useState(location.state?.trendMusic || []);
  
  const navigate = useNavigate()
  const [totalTime, setTotalTime] = useState(0)
  const [playingIndex, setPlayingIndex] = useState(null)
  
  
  useEffect(() => {
    const musicTime = trendMusic.reduce((sum, music) => {
      return sum + (Number(music.duration) || 0)
    }, 0)
    console.log('The total duration of the music is', musicTime);
    console.log(trendMusic.length)
  }, [trendMusic])
  

  const navigateBack = () =>{
    navigate('/')
  }
  function formatMsToMinutesSeconds(s) {
    const seconds = Math.floor(s);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  const playAll = async () => {
    if(!trendMusic || trendMusic.length === 0);
    setPlayingIndex(0)
    const firstTrack = trendMusic[0];
    const res = await fetch(`https://api.audius.co/v1/tracks/${firstTrack.id}/stream`)
    const streamUrl = res.url;
    setCurrentTrack({ ...firstTrack, audioUrl: streamUrl });
    setIsPlaying(true);
    toast.success('Playing all music')
  }
  useEffect(() => {
    if (playingIndex === null || !trendMusic || playingIndex >= trendMusic.length) return;

    const handleTrackEnd = async () => {
      const nextIndex = playingIndex + 1;
      if (nextIndex < trendMusic.length) {
        setPlayingIndex(nextIndex);
        const nextTrack = trendMusic[nextIndex];
        const res = await fetch(`https://api.audius.co/v1/tracks/${nextTrack.id}/stream`);
        const streamUrl = res.url;
        setCurrentTrack({ ...nextTrack, audioUrl: streamUrl });
        setIsPlaying(true);
        
      } else {
        setPlayingIndex(null);
        setIsPlaying(false);
      }
    };

    const audio = document.querySelector('audio');
    if (audio) {
      audio.onended = handleTrackEnd;
    }

    return () => {
      if (audio) audio.onended = null;
    };
  }, [playingIndex, currentTrack, trendMusic]);

  useEffect(() => {
    if (!location.state?.trendMusic) {
      axios.get('https://api.audius.co/v1/tracks/trending')
        .then(res => {
          const filtered = res.data.data
            .filter(track => track.favorite_count != null)
            .sort((a, b) => b.favorite_count - a.favorite_count)
            .slice(0, 20);
          setTrendMusic(filtered);
        });
    }
  }, [location.state]);
  
  return (
    <>
      <div>
        <Topnav headerContent1='Al' headerContent2='bumn' />
        <div className='w-full h-[216px] md:h-[400px] relative rounded-[10px]' style={{background: 'linear-gradient(to right, rgba(17, 113, 226, 100), rgba(83, 173, 214, 0.2))', backgroundSize: 'cover', marginBottom: '20px', padding: '20px'}}>
          <div className='flex flex-col justify-between h-full w-full'>
            <div>
              <img className='cursor-pointer' onClick={navigateBack} src={BackArrow} alt="" />
            </div>
            <div className='flex flex-col md:flex-row md:justify-between items-end'>
              <div className='flex items-center gap-4'>
                <div className='w-[160px] h-[100px] md:w-[268px] md:h-[268px] object-fit-cover rounded-[10px]'>
                  <img className='w-full h-full object-fit-cover rounded-[10px]' src={TrendImage} alt="" />
                </div>
                <div style={{padding: '15px 0'}} className='flex md:h-[268px] flex-col justify-between'>
                  <h1 className='text-white text-2xl md:text-4xl font-bold'>Trending Song <span className='coloredTxt'>Mix</span></h1>
                  <p className='text-white hidden md:block w-3/4'>tate mcree, nightmares, the neighberhood, doja cat and ...</p>
                  <p className='text-white text-[20px]'>{trendMusic.length} Songs <span className='coloredTxt'>▪</span> {formatMsToMinutesSeconds(3311) || '00:00'}</p>
                </div>
              </div>

              {/* track count */}
              <div onClick={playAll} className='cursor-pointer absolute top-[5%] md:relative flex flex-col items-center text-[#EE10B0]'>
                <h1 style={{padding: '2px 8px'}} className='text-3xl border-3 border-[#EE10B0] rounded-[50%]'>▶</h1>
                <p className=''>Play All</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-white'>
        <div className='topTrending'>
          <div></div>
          <div></div>
          <div className='hidden md:block' style={{justifyItems: 'center'}}><h4>Release Date</h4></div>
          <div className='hidden md:block' style={{justifyItems: 'center'}}><h4>Genre</h4></div>
          <div><h4>Time</h4></div>
        </div>
        <Trending 
          trendMusic={trendMusic}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>

    
    </>
  )
}

export default TrendingPage