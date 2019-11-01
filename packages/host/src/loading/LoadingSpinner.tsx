import React from 'react'
import ReactLoading from 'react-loading'
import './LoadingSpinner.scss'

interface ILoadingSpinner {
  height?: number
  width?: number
}

const LoadingSpinner = ({ height, width }: ILoadingSpinner) => {
  return (
    <div className="LoadingSpinner">
      <ReactLoading
        type="bubbles"
        color="#AF00FF"
        height={height ? height : 400}
        width={width ? width : 400}
      />
    </div>
  )
}

export default LoadingSpinner
