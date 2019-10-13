import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton, Typography, Hidden } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import Carousel from 'nuka-carousel'
import arrowLeft from 'assets/arrow-left.svg'
import arrowRight from 'assets/arrow-right.svg'
import IAction from 'IAction'
import logo from 'assets/monkey_logo.png'
import LoadingSpinner from 'loading/LoadingSpinner'
import IEvent from 'event/IEvent'
import IUser from 'user/IUser'
import EventCard from 'catalogue/SmallEventCard'
import './Home.scss'
import PlaylistCard from 'catalogue/SmallPlaylistCard'

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

  const leftControl = ({ previousSlide }: any) => (
    <IconButton onClick={previousSlide} className="Home-carousel-item-nav-left">
      <img src={arrowLeft} alt="left" />
    </IconButton>
  )

  const rightControls = ({ nextSlide }: any) => (
    <IconButton onClick={nextSlide} className="Home-carousel-item-nav-right">
      <img src={arrowRight} alt="right" />
    </IconButton>
  )

  return (
    <div className="Home-root">
      <Hidden mdUp implementation="css">
        <div className="Home-create-event-small">
          <Link to={'/create-event'}>
            <Button variant="contained" color="secondary">
              <div>
                <img alt="music monkey logo" src={logo} />
                <span>CREATE NEW EVENT</span>
              </div>
            </Button>
          </Link>
        </div>
      </Hidden>

      <div className="Home-shelf">
        <div className="Home-carousel">
          <Typography
            align="center"
            variant="body2"
            gutterBottom={true}
            className="Home-carousel-caption"
          >
            Your Events
          </Typography>
          <Carousel
            slidesToShow={1}
            slidesToScroll={1}
            dragging
            swiping
            renderCenterLeftControls={leftControl}
            renderCenterRightControls={rightControls}
            renderBottomCenterControls={null}
          >
            {map(
              sortBy(events, (event: IEvent) => event.startDateTime).reverse(),
              (event: IEvent) => (
                <div key={event.eventId} className="Home-carousel-item">
                  <EventCard event={event} />
                </div>
              )
            )}
          </Carousel>
        </div>
        <Hidden mdDown implementation="css">
          <div className="Home-create-event">
            <Link to={'/create-event'}>
              <Button variant={'contained'} color={'secondary'}>
                <div>
                  <img alt="music monkey logo" src={logo} />
                  <span>CREATE NEW EVENT</span>
                </div>
              </Button>
            </Link>
          </div>
        </Hidden>
        <div className="Home-carousel">
          <Typography
            align="center"
            variant="body2"
            gutterBottom={true}
            className="Home-carousel-caption"
          >
            Your Playlists
          </Typography>
          <Carousel
            slidesToShow={1}
            slidesToScroll={1}
            dragging
            swiping
            renderCenterLeftControls={leftControl}
            renderCenterRightControls={rightControls}
            renderBottomCenterControls={null}
          >
            {map(
              sortBy(events, (event: IEvent) => event.startDateTime).reverse(),
              (event: IEvent) => (
                <div key={event.eventId} className="Home-carousel-item">
                  <PlaylistCard playlist={event.playlist!} />
                </div>
              )
            )}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Home
