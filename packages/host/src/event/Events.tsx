import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'
import { map, sortBy } from 'lodash'
import Carousel from 'nuka-carousel'
import * as React from 'react'
import { Link } from 'react-router-dom'
import arrowLeft from 'assets/arrow-left.svg'
import arrowRight from 'assets/arrow-right.svg'
import logoForButton from 'assets/monkey_logo.png'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import IUserState from 'user/IUserState'
import EventCard from './EventCard'
import IEvent from './IEvent'
import IEventState from './IEventState'
import PlaylistCard from './PlaylistCardSmall'
import './Events.scss'

interface IEventsProps {
  events: IEventState
  user: IUserState
  getEvents(): IAction
}

class Events extends React.Component<IEventsProps> {
  public componentDidMount() {
    if (this.props.user.data) {
      this.props.getEvents()
    }
  }

  public renderCarousel = (
    events: IEvent[],
    playlist: boolean,
    message?: string
  ) => {
    const upcomingPlaylists: any[] = events.map(event => event.playlist)

    const leftControl = ({ previousSlide }: any) => (
      <IconButton onClick={previousSlide}>
        <img src={arrowLeft} alt="left" />
      </IconButton>
    )

    const rightControls = ({ nextSlide }: any) => (
      <IconButton onClick={nextSlide}>
        <img src={arrowRight} alt="right" />
      </IconButton>
    )

    return (
      <React.Fragment>
        {/*{!playlist && events.length === 0 && <NoEvents />}*/}
        {playlist && events.length === 0 && (
          <Typography align="center" variant="body2" gutterBottom={true}>
            {message}
          </Typography>
        )}
        {events.length > 0 && (
          <Carousel
            slidesToShow={1}
            slidesToScroll={1}
            renderCenterLeftControls={leftControl}
            renderCenterRightControls={rightControls}
            withoutControls={
              ((!(events.length > 5) && !playlist) ||
                (!(upcomingPlaylists.length > 5) && playlist)) &&
              true
            }
          >
            {events.length > 0 &&
              !playlist &&
              map(
                sortBy(
                  events,
                  (event: IEvent) => event.startDateTime
                ).reverse(),
                (event: IEvent) => (
                  <EventCard key={event.eventId} event={event} />
                )
              )}
            {playlist &&
              upcomingPlaylists.map((upcomingPlaylist, index) => (
                <PlaylistCard key={index} playlist={upcomingPlaylist} />
              ))}
          </Carousel>
        )}
      </React.Fragment>
    )
  }

  public render() {
    const { events, eventsLoading } = this.props.events

    return (
      <div className="events">
        {eventsLoading && <LoadingSpinner />}

        {!eventsLoading && !_.isEmpty(events) && events.length > 0 ? (
          <React.Fragment>
            <Grid container={true} spacing={3} direction="row">
              <Grid item={true} sm={5} container={true} justify={'center'}>
                <Link to={'/all-events'} className="eventListShowAll">
                  EVENTS
                </Link>
                <div className="eventsList">
                  {this.renderCarousel(events, false)}
                </div>
              </Grid>

              <Grid
                item={true}
                sm={2}
                container={true}
                justify={'center'}
                alignItems={'center'}
              >
                <Link to={'/create-event'}>
                  <Button variant={'contained'} color={'secondary'}>
                    <div className="event-createEventButtonContent">
                      <img
                        alt="music monkey logo"
                        src={logoForButton}
                        className="event-monkeyLogoButton"
                      />
                      <span>CREATE NEW EVENT</span>
                    </div>
                  </Button>
                </Link>
              </Grid>

              <Grid item={true} sm={5} container={true} justify={'center'}>
                <Link to={'/all-playlists'} className="eventListShowAll">
                  PLAYLISTS
                </Link>
                <div className="eventsList">
                  {this.renderCarousel(events, true, 'No Upcoming Playlists')}
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          !eventsLoading && (
            <Grid
              item={true}
              sm={2}
              container={true}
              justify={'center'}
              alignItems={'center'}
            >
              <Link to={'/create-event'}>
                <Button variant={'contained'} color={'secondary'}>
                  <div className="event-createEventButtonContent">
                    <img
                      alt="music monkey logo"
                      src={logoForButton}
                      className="event-monkeyLogoButton"
                    />
                    <span>CREATE NEW EVENT</span>
                  </div>
                </Button>
              </Link>
            </Grid>
          )
        )}
      </div>
    )
  }
}

export default Events
