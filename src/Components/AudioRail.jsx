import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../assets/spinner.gif';

const AudioRail = ({ currentTrack, isPlaying, setIsPlaying, setCurrentTrack, trackList = [] }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRailVisible, setIsRailVisible] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  const showRail = () => setIsRailVisible(!isRailVisible);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audioUrl) return;

    audio.src = currentTrack.audioUrl;
    audio.load();

    const handleLoaded = () => {
      if (isPlaying) {
        audio.play().catch(err => console.warn('Autoplay failed:', err));
      }
    };

    audio.addEventListener('loadedmetadata', handleLoaded);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn('Playback failed:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => setCurrentTime(0), [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlaying(false);
    audio?.addEventListener('ended', handleEnded);
    return () => audio?.removeEventListener('ended', handleEnded);
  }, [setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('canplay', handlePlaying);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('canplay', handlePlaying);
    };
  }, [currentTrack]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * duration;

    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleNext = () => {
    const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % trackList.length;
    setCurrentTrack(trackList[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    setCurrentTrack(trackList[prevIndex]);
    setIsPlaying(true);
  };

  if (!currentTrack) return null;

  return (
    <div
      style={isRailVisible ? { transform: 'translateY(0%)', padding: '10px 20px' } : { transform: 'translateY(100%)', padding: '10px 20px' }}
      className="w-[100%] bg-[#252525] rounded-[5px] lg:rounded-0 lg:bg-[#EE10B0] flex flex-col items-center justify-center fixed bottom-[80px] lg:bottom-0 left-0 forAudio z-50"
    >
      <audio ref={audioRef} />

      <div className='w-[100%] flex flex-col items-center justify-center'>
        <div className='w-[100%] h-[100%] grid grid-cols-[3fr_1fr] lg:grid-cols-[1fr_1fr_1fr] grid-rows-[auto] items-center'>
          <div className='flex items-center gap-3 justify-start text-white mb-2 px-4'>
            <div className='w-[50px] h-[50px] rounded-[10px] object-fit-cover'>
              <img
                className='w-[100%] h-[100%] rounded-[10px]'
                src={currentTrack.artwork?.['150x150'] || 'https://via.placeholder.com/58'}
                alt="no-image"
              />
            </div>
            <div>
              <h1>{currentTrack.title}</h1>
              <h2 className='text-gray-300'>{currentTrack.user?.name}</h2>
            </div>
          </div>

          <div className="text-white text-center mb-2 px-4 flex justify-center items-center gap-4 text-2xl">
            <button onClick={handlePrevious}>⏮</button>
            <button onClick={() => setIsPlaying(prev => !prev)}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={handleNext}>⏭</button>

            {isBuffering && (
              <img
                src={Spinner}
                alt="Buffering"
                className="w-6 h-6 animate-spin"
              />
            )}
          </div>

          <div className="text-white absolute text-[14px] bottom-[0px] right-[20px] lg:relative lg:block text-right lg:text-[20px]">
            <span>{formatTime(currentTime)} / </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="absolute top-0 left-0 w-full h-1 bg-[#0E9EEF] cursor-pointer overflow-hidden"
        >
          <div className="h-full bg-[white]" style={{ width: `${(currentTime / duration) * 100 || 0}%` }} />
        </div>

        <div onClick={showRail}>
          <button className='isRailvisible text-white text-3xl cursor-pointer absolute top-[-50%] right-[10px]'>
            {isRailVisible ? '🔻' : '🔺'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioRail;
