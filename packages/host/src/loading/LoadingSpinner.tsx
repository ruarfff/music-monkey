import * as React from 'react'
import ReactLoading from 'react-loading'
import './LoadingSpinner.scss'

const LoadingSpinner = () => (
  <div className="LoadingSpinner">
    <ReactLoading type="cylon" color="#AF00FF" height={400} width={400} />
  </div>
)

export default LoadingSpinner
