import React, { useEffect, useRef, useState } from 'react';

const AudioRail = ({ currentTrack, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.audioUrl) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  // Handle track end
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

  useEffect(() => setCurrentTime(0), [currentTrack]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // SEEK on progress click or drag
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

  if (!currentTrack) return null;
  
  

  return (
    <div style={{padding: '0px 20px'}} className="w-[100%] bg-[#EE10B0] flex flex-col items-center justify-center fixed bottom-0 left-0 forAudio z-50">
        <audio ref={audioRef} src={currentTrack?.audioUrl || ''} />
        {currentTrack ? (
          <div className='w-[100%] h-[100px] flex flex-col items-center justify-center'>
            <div className='w-[100%] h-[100%] grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto] items-center'>
              {/* first */}
              <div className='flex items-center gap-3 justify-start text-white mb-2 px-4'>
                <div className='w-[60px] h-[60px] rounded-[10px] object-fit-cover'>
                  <img className='w-[100%] h-[100%] rounded-[10px]' src={currentTrack.artwork?.['150x150'] || 'https://via.placeholder.com/58'} alt="no-image" />
                </div>
                <div>
                  <h1>{currentTrack.title}</h1>
                  <h2 className='text-gray-300'>{currentTrack.user?.name}</h2>
                </div>
              </div>

              {/* second */}
              <div className="text-white text-center mb-2 px-4">
                <button className="text-2xl cursor-pointer" onClick={() => setIsPlaying(prev => !prev)}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>

              {/* third */}
              <div className="text-white text-right text-[20px]">
                <span>{formatTime(currentTime)} / </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className="absolute top-0 left-0 w-full h-1 bg-[#0E9EEF] cursor-pointer overflow-hidden">
              <div
                className="h-full bg-[white]"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}/>
            </div>
          </div>
        ) : (
            <span className="text-white">No track selected</span>
          )}
    </div>
  );
};

export default AudioRail;
