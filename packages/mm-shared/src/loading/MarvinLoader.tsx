import React from 'react'
import marvin from '../assets/marvin.png'
import './MarvinLoader.scss'

const MarvinLoader = () => {
  return (
    <div className="MarvinLoader-root">
      <div className="m-loader">
        <img src={marvin} alt="Marvin" />
      </div>
    </div>
  )
}

export default MarvinLoader
