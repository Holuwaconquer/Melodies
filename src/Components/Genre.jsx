import React, {useContext, useEffect, useState} from 'react'
import { apiDetails } from '../App';
import Pop from '../assets/pop.png'
import Rap from '../assets/rap.png'
import Rock from '../assets/rock.png'
import Classic from '../assets/classic.png'
const Genre = () => {
  const genreImages = {
    Pop: Pop,
    Trap: Rap,
    House: Rock,
    Electronic: Classic
  };

  const apiData = useContext(apiDetails)
  const [genre, setGenre] = useState(null)
  const [repeatedGenres, setRepeatedGenres] = useState([])
  
  useEffect(() => {
    const genreList = apiData.flatMap(item => item.genre);

    const genreCount = genreList.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {})

    const duplicates = Object.keys(genreCount).filter(key => genreCount[key] > 1);

    setRepeatedGenres(duplicates)
    
    }, [apiData])
    
  
  return (
    <>
    <div className='w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-rows-[auto] gap-[10px]'>
        {repeatedGenres.map((genre, index) => (
          <div key={index} style={{padding: '10px', background: `linear-gradient(to right, #3333334b, #3333334b), url(${genreImages[genre]}) center center no-repeat`}} className='w-full h-[120px] flex flex-col text-center items-center justify-end'>
              <h1 className='text-white text-2xl'>{genre}</h1>
          </div>
        ))}
    </div>
    </>
  )
}

export default Genre