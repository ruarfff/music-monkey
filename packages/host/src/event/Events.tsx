// import Divider from '@material-ui/core/Divider/Divider'
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'
// import Hidden from '@material-ui/core/Hidden/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography/Typography'
import _ from 'lodash'
import { map, sortBy } from 'lodash'
// import moment from 'moment'
import Carousel from 'nuka-carousel'
import * as React from 'react'
import { Link } from 'react-router-dom'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'
import logoForButton from '../assets/monkey_logo.png'
import IAction from '../IAction'
import LoadingSpinner from '../loading/LoadingSpinner'
import IUserState from '../user/IUserState'
import EventCard from './EventCard'
import './Events.scss'
import IEvent from './IEvent'
import IEventState from './IEventState'
// import NoEvents from './NoEvents'
import PlaylistCard from './PlaylistCardSmall'

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
    // const now = moment()

    let upcomingPlaylists: any[] = events.map(event => event.playlist)

    // if (!!events && playlist) {
    //   upcomingPlaylists = _.uniqBy(
    //     events
    //       .filter(event => event.startDateTime.isAfter(now))
    //       .map(event => event.playlist),
    //     'id'
    //   ).reverse()
    // }

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
        {playlist &&
          events.length === 0 && (
            <Typography
              className="eventsListCaption"
              align="center"
              variant="body2"
              gutterBottom={true}
            >
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
              (
                (!(events.length > 5) && !playlist) ||
                (!(upcomingPlaylists.length > 5) && playlist)
              ) && true
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
    // const now = moment()
    // let upcomingEvents: IEvent[] = []
    // if (!!events) {
    //   upcomingEvents = events.filter(event => event.startDateTime.isAfter(now))
    // }

    return (
      <div className="events">
        {eventsLoading && <LoadingSpinner />}

        {!eventsLoading &&
          !_.isEmpty(events) &&
          events.length > 0 && (
            <React.Fragment>
              <Grid container={true} spacing={24} direction="row">
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
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                  >
                    <Link to={'/create-event'}>
                      <div className="event-createEventButtonContent">
                        <img src={logoForButton} className="event-monkeyLogoButton"/>
                        <span>
                          CREATE NEW EVENT
                        </span>
                      </div>
                    </Link>
                  </Button>
                </Grid>

                <Grid item={true} sm={5} container={true} justify={'center'}>
                  <Link to={'/all-playlists'} className="eventListShowAll">
                    PLAYLISTS
                  </Link>
                  <div className="eventsList">
                    {this.renderCarousel(
                      events,
                      true,
                      'No Upcoming Playlists'
                    )}
                  </div>
                </Grid>

              </Grid>
            </React.Fragment>
          )}
      </div>
    )
  }
}

export default Events
