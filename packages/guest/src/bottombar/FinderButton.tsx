import * as React from 'react'
import { Link } from 'react-router-dom'
import Monkey from '../assets/finder-logo.png'
import './FinderButton.scss'

interface IFinderButton {
  id: string
}

export const FinderButton = (props: IFinderButton) => {
  return (
    <div className="FinderButton-root">
      <Link
        to={props.id ? `/finder/${props.id}` : '/finder'}
        className="FinderButton-link"
      >
        <img alt="finder" src={Monkey} />
      </Link>
    </div>
  )
}
