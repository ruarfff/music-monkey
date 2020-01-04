import * as React from 'react'
import logo from '../assets/MM_Logo-logo-purple.png'
import './LoadingPage.scss'

const LoadingPage = () => (
  <div className="loadingPage">
    <div className="loadingPage-container">
      <img alt="loading logo" className="ing-logo" src={logo} />
    </div>
  </div>
)

export default LoadingPage
