import React, { useEffect } from 'react'

const UserProfile = () => {

  useEffect(() => {
    alert("hello")
  }, [])
  
  return (
    <div className='text-white'>UserProfile</div>
  )
}

export default UserProfile