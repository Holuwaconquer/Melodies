import React, {useContext, useEffect, useState} from 'react'
import { apiDetails } from '../App';
import Chill from '../assets/chill.png'
import Workout from '../assets/workout.png'
import Love from '../assets/love.png'
import Sad from '../assets/sad.png'
const Mood = () => {
  const moodImages = {
    Cool: Chill,
    Upbeat: Workout,
    Fiery: Sad,
    Sentimental: Love
  };

  const apiData = useContext(apiDetails)
  const [mood, setmood] = useState(null)
  const [repeatedmoods, setRepeatedmoods] = useState([])
  
  useEffect(() => {
    const moodList = apiData.flatMap(item => item.mood);

    const moodCount = moodList.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {})

    const duplicates = Object.keys(moodCount).filter(key => moodCount[key] > 1);

    setRepeatedmoods(duplicates)
    }, [apiData])
    

  
  return (
    <>
    <div className='w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-rows-[auto] gap-[10px]'>
        {repeatedmoods.map((mood, index) => (
          <div key={index} style={{padding: '10px', background: `linear-gradient(to right, #3333334b, #3333334b), url(${moodImages[mood]}) center center no-repeat`}} className='w-full h-[120px] flex flex-col text-center items-center justify-end'>
              <h1 className='text-white text-2xl'>{mood}</h1>
          </div>
        ))}
    </div>
    </>
  )
}

export default Mood