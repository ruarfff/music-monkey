import React from 'react'
import IAction from 'IAction'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'
import EventListView from 'event/EventListViewContainer'

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
      <EventListView />
    </div>
  )
}

export default Home
