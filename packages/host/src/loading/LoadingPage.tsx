import * as React from 'react'
import Images from '../img/ImportImg'
import './LoadingPage.scss'

const LoadingPage = () => (
  <div className="loadingPage">
    <div className="loadingPage-container">
      <img alt="loading logo" className="ing-logo" src={Images.Logo} />
    </div>
  </div>
)

export default LoadingPage
