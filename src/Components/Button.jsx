import React from 'react'

const Button = ({ btnTitle, btnClassName}) => {
  return (
    <>
        <button className={btnClassName}>{btnTitle}</button>
    </>
  )
}

export default Button