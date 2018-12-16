import * as React from 'react'
import './LoadingSpinner.scss'

interface ITrackListProps {
  showSpinner: boolean
}

const LoadingSpinner = ({ showSpinner = false }: ITrackListProps) => (
  <React.Fragment>
    {showSpinner ? (
      <div className="loader-container">
        <div className="loader" />
      </div>
    ) : null}
  </React.Fragment>
)

export default LoadingSpinner
