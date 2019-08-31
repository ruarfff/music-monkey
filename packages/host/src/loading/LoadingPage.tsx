import * as React from 'react'
import { Logo } from 'music-monkey-images'
import './LoadingPage.scss'

const LoadingPage = () => (
  <div className="loadingPage">
    <div className="loadingPage-container">
      <img alt="loading logo" className="ing-logo" src={Logo} />
    </div>
  </div>
)

export default LoadingPage
