import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setSender } from '../redux/usersDetails'



const PopularArtist = ({ trendMusic }) => {


  const dispatch = useDispatch()

  const navaigate = useNavigate()
  const viewProfile =(music) =>{
    navaigate('/profile', { state: { music } })
  }
  return (
    
    <div style={{margin: '20px 0'}} className='w-full grid items-center flex-nowrap justify-center grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-[36px] p-4'>
      {trendMusic?.slice(0, 5).map((music, index) => (
        <Link to={`/profile/${music.user.name}`}  onClick={()=> dispatch(setSender(music))} key={index}>
        <div  key={index} className='popularArtistCard cursor-pointer flex flex-col items-center w-full justify-center gap-2'>
          <div className='w-[130px] h-[130px] rounded-full overflow-hidden'>
            <img src={music.artwork?.['150x150']} alt={music.title} className='artistImage w-full h-full object-fit-cover rounded-full' />
          </div>
          <div className='artistInfo'>
            <h3 className='artistName'>{music.user.name}</h3>
          </div>
        </div>
        </Link>
      ))
      }
    </div>
  )
}

export default PopularArtist