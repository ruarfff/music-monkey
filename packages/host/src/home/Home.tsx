import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import IAction from 'IAction'
import logo from 'assets/marvin.png'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'

import './Home.scss'

interface IHomeProps {
  events: IEvent[]
  user: IUser
  eventsLoading: boolean
  getEvents(): IAction
}

const Home = ({ user }: IHomeProps) => {
  return (
    <div className="Home-root">
      <div className="Home-create-event">
        <Link to={'/create-event'}>
          <Button variant="contained" color="secondary">
            <div>
              <img alt="music monkey logo" src={logo} />
              <span>CREATE NEW EVENT</span>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
