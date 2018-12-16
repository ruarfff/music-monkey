import * as React from 'react'
import Images from '../img/ImportImg'
import './LoadingPage.scss'

const LoadingPage = () => (
  <div className="loadingPage">
    <div className="loadingPage-container">
      <img className="ing-logo" src={Images.Logo} />
    </div>
  </div>
)

export default LoadingPage
