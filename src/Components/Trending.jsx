import React, { useState } from 'react';
import playingGif from '../assets/playingGif.gif';
import spinnerGif from '../assets/spinner.gif';
import { useNavigate } from 'react-router-dom';

const Trending = ({ trendMusic, currentTrack, setCurrentTrack, isPlaying, setIsPlaying, trendNum }) => {
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
            } finally {
                setLoadingId(null);
            }
        }
    };

    const goTrend = (music) => {
        navigate('/MusicPage', { state: { music } });
    }; 

    return (
        <>
            {trendMusic?.slice(0, trendNum).map((music, index) => (
                <div
                    key={`${music.id}-${index}`}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr 2fr 2fr 3fr 1fr',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px 0',
                        cursor: 'pointer'
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
                        onClick={() => goTrend(music)}
                    >
                        <div style={{ width: '58px', height: '58px', borderRadius: '5px' }} className='imgTrend'>
                            <img
                                src={music.artwork?.['150x150'] || 'https://via.placeholder.com/58'}
                                alt={music.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                            />
                        </div>
                        <div>
                            <h4 className="font-bold">{music.title}</h4>
                            <p className="text-gray-600">{music.user?.name}</p>
                        </div>
                    </div>

                    {/* Release Date */}
                    <div>
                        <p>{music.release_date ? new Date(music.release_date).toLocaleDateString() : '-'}</p>
                    </div>

                    {/* Genre */}
                    <div>
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
