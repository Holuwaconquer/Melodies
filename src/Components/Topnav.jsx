import React from 'react'

const Topnav = ({headerContent1, headerContent2}) => {
  return (
    <div style={{marginBottom: '20px'}} className='w-full block lg:hidden'>
      <h1 className='text-3xl text-center text-white font-bold'>{headerContent1}<span className='coloredTxt'>{headerContent2}</span></h1>
    </div>
  )
}

export default Topnav