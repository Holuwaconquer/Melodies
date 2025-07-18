import React, { useState } from 'react';
import playingGif from '../assets/playingGif.gif';
import spinnerGif from '../assets/spinner.gif';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Trending = ({ trendMusic, trendNum, currentTrack, setCurrentTrack, isPlaying, setIsPlaying }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [loadingId, setLoadingId] = useState(null);
    const navigate = useNavigate();
    

    function formatMsToMinutesSeconds(s) {
        const seconds = Math.floor(s);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const playMusic = async (event, music) => {
        event.stopPropagation();

        if (currentTrack?.id === music.id && isPlaying) {
            setIsPlaying(false);
        } else {
            setLoadingId(music.id);
            try {
                const res = await fetch(`https://api.audius.co/v1/tracks/${music.id}/stream`);
                if (!res.ok) throw new Error('Stream fetch failed');
                const streamUrl = res.url;
                setCurrentTrack({ ...music, audioUrl: streamUrl });
                setIsPlaying(true);
            } catch (err) {
                console.error('Stream error:', err);
                toast.error('An error occured !')
            } finally {
                setLoadingId(null);
            }
        }
    };

    
    return (
        <>
            {trendMusic?.slice(0, trendNum).map((music, index) => (
                <div
                    key={`${music.id}-${index}`}
                    style={{
                        
                    }}
                    className='trendingTop hover:bg-gray-100'
                    onMouseOver={() => setHoveredIndex(index)}
                    onMouseOut={() => setHoveredIndex(null)}
                >
                    {/* ▶️ Play Button or Playing Indicator */}
                    <div>
                        <h1
                            style={{ cursor: 'pointer' }}
                            onClick={(event) => playMusic(event, music)}
                        >
                            {loadingId === music.id ? (
                                <img src={spinnerGif} alt="Loading" style={{ width: '40px' }} />
                            ) : currentTrack?.id === music.id && isPlaying ? (
                                <img src={playingGif} alt="Playing" style={{ width: '40px' }} />
                            ) : hoveredIndex === index ? (
                                '▶'
                            ) : (
                                index + 1
                            )}
                        </h1>
                    </div>

                    {/* Thumbnail and Info */}
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                        className='trendingThumbnail'
                    >
                        <div className='imgTrend w-[40px] h-[40px] rounded-[5px] md:w-[58px] md:h-[58px]'>
                            <img
                                src={music.artwork?.['150x150'] || 'https://via.placeholder.com/58'}
                                alt={music.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                            />
                        </div>
                        <div className='w-3/4 md:w-full'>
                            <h4 className="font-bold text-[14px]">{music.title}</h4>
                            <p className="text-gray-600">{music.user?.name}</p>
                        </div>
                    </div>

                    {/* Release Date */}
                    <div className='text-center hidden md:block'>
                        <p>{music.release_date ? new Date(music.release_date).toLocaleDateString() : '-'}</p>
                    </div>

                    {/* Genre */}
                    <div className='hidden md:block'>
                        <p className='text-center'>{music.genre || '-'}</p>
                    </div>

                    {/* Duration */}
                    <div>
                        <p>{formatMsToMinutesSeconds(music.duration)}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Trending;
