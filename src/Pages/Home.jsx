import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import Trending from '../Components/Trending'
import axios from 'axios'
import PlusIcon from '../assets/plus.png'
import { useNavigate } from 'react-router-dom'
import PopularArtist from '../Components/PopularArtist'

const Home = ({apiData, isLoading, setIsPlaying, isPlaying, setCurrentTrack, currentTrack}) => {
    let navigate = useNavigate()
    const [showViewAllBtn, setShowViewAllBtn] = useState(false)
    const [trendNum, setTrendNum] = useState(7)

    const [trendMusic, setTrendMusic] = useState([])
    useEffect(() => {
        const filtered = apiData.filter(track => track.favorite_count != null)
        .sort((a, b) => b.favorite_count - a.favorite_count)
        .slice(0, 20);
        setTrendMusic(filtered)
        setShowViewAllBtn(filtered.length > 7)
        // console.log(trendMusic);
    }, [apiData])
    

    const seemore = () => {
        setTrendNum(15)
    }

  return (
    <>
            <Hero />
            <h1 style={{color: 'white'}} className='topSongTitle'>Weekly Top <span className='coloredTxt'>Songs</span> </h1>
            <div className='topCardContainer'>
                {isLoading ? 
                <div className='skeletonContainer'>
                    {[...Array(5)].map((_, i) => (
                        <div className="skeleton-loader" key={i}>
                            <div className="image"></div>
                            <div className="title"></div>
                            <div className="subtitle"></div>
                        </div>
                    ))}
                </div>
                    : apiData.slice(0, 5).map((music, index) =>(
                        <Card key={index} music={music}/>
                    ))
                }
            </div>
            <h1 style={{color: 'white'}} className='topSongTitle'>Trending<span className='coloredTxt'> Songs</span> </h1>
            <div className='trendingSong'>
                <div className='topTrending'>
                    <div></div>
                    <div></div>
                    <div style={{justifyItems: 'center'}}><h4>Release Date</h4></div>
                    <div style={{justifyItems: 'center'}}><h4>Genre</h4></div>
                    <div><h4>Time</h4></div>
                </div>
                {isLoading ? 
                    <div className='trendingLoader'>
                        {[...Array(35)].map((_, i) => (
                            <div className="trendingLoader-content" key={i}>
                                <div className='loaderId'></div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '1em'}} className='trendingThumbnail'>
                                    <div className='loadaerImg'></div>
                                    <div className='loaderHeader'></div>
                                </div>
                                <div className='loaderDate'></div>
                                <div className='loaderAlbum'></div>
                                <div className='loaderTime'></div>
                            </div>
                        ))}
                    </div>
                    : <Trending 
                    trendNum={trendNum}
                        trendMusic={trendMusic}
                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying} 
                    />
                }
                {/* view all btn */}
                <div
                    style={{
                        textAlign:'center',
                        width: '100%',
                        display: showViewAllBtn ? 'flex' : 'none',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <button onClick={seemore}
                        style={{
                            backgroundColor: '#1E1E1E', 
                            border: 'none', 
                            borderRadius: '4px',
                            display: 'flex',
                            gap: '10px',
                            color: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <img src={PlusIcon} alt="" />
                        <span>View All</span>
                    </button>
                </div>
                {/* end of viewallbtn */}

                <h1 style={{color: 'white'}} className='topSongTitle'>Popular <span className='coloredTxt'>Artist</span> </h1>
                <div className='topCardContainer'>
                {isLoading ? 
                    <div className='skeletonContainer'>
                        {[...Array(5)].map((_, i) => (
                            <div className="skeleton-loader" key={i}>
                                <div className="image rounded-[50%]"></div>
                                <div className="title"></div>
                            </div>
                        ))}
                    </div>
                    : <PopularArtist 
                        trendNum={trendNum}
                        trendMusic={trendMusic}
                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying} 
                        apiData={apiData}
                    />
                }
            </div>
            </div>
            
    </>
  )
}

export default Home