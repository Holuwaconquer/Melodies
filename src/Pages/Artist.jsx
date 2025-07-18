import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Artist = ({ apiData }) => {

  useEffect(() => {
   console.log(apiData);
   
   
  }, [])
  console.log(apiData);
  
  return (
    <div>Artist</div>
  )
}

export default Artist