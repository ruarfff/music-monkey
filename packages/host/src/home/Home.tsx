import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import IAction from 'IAction'
import logo from 'assets/monkey_logo.png'
import LoadingSpinner from 'loading/LoadingSpinner'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'
import EventCard from 'event/EventCard'
import './Home.scss'

interface IHomeProps {
  events: IEvent[]
  user: IUser
  eventsLoading: boolean
  getEvents(): IAction
}

const Home = ({ user, events, eventsLoading, getEvents }: IHomeProps) => {
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  }, [events, eventsLoading, getEvents])

  if (eventsLoading) return <LoadingSpinner />

  if (isEmpty(events)) {
    return (
      <div>
        <Link to={'/create-event'}>
          <Button variant={'contained'} color={'secondary'}>
            <div>
              <img alt="music monkey logo" src={logo} />
              <span>CREATE NEW EVENT</span>
            </div>
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="Home-root">
      <Carousel
        className="Home-carousel"
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {map(
          sortBy(events, (event: IEvent) => event.startDateTime).reverse(),
          (event: IEvent) => (
            // <div key={event.eventId}>
            //   <p>{event.name}</p>
            //   <img src={event.imageUrl} alt="Event Carousel" />
            // </div>
            <div className="Home-carousel-item">
              <EventCard key={event.eventId} event={event} />
            </div>
          )
        )}
      </Carousel>
    </div>
  )
}

export default Home
