import * as React from 'react'
import { Link } from 'react-router-dom'
import Monkey from '../assets/finder-logo.png'
import './FinderButton.scss'

export const FinderButton: React.FC = () => {
  return (
    <div className="FinderButton-root">
      <Link to="/finder" className="FinderButton-link">
        <img src={Monkey} />
      </Link>
    </div>
  )
}
