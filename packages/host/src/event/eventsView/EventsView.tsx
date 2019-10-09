import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography/Typography'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import IAction from 'IAction'
import IEvent from 'event/IEvent'
import NoEvents from 'event/NoEvents'
import LoadingSpinner from 'loading/LoadingSpinner'
import IUserState from 'user/IUserState'
import EventBigCard from './EventBigCard'
import './EventsView.scss'

const pathToFilter = {
  '/all-events': 'all',
  '/past-events': 'past',
  '/upcoming-events': 'upcoming'
}
interface IEventsProps extends RouteComponentProps {
  events: IEvent[]

  eventsLoading: boolean
  user: IUserState
  getEvents(): IAction
}

const EventsView = ({
  events = [],
  eventsLoading,
  getEvents,
  location
}: IEventsProps) => {
  const [visibleEvents, setVisibleEvents] = useState(events)
  const now = moment()
  const currentFilter = pathToFilter[location.pathname]
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }

    if (currentFilter === 'all' && visibleEvents !== events) {
      setVisibleEvents(events)
    } else if (currentFilter === 'past') {
      setVisibleEvents(
        events.filter(event => event.startDateTime.isBefore(now))
      )
    } else if (currentFilter === 'upcoming') {
      setVisibleEvents(events.filter(event => event.startDateTime.isAfter(now)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, eventsLoading, getEvents, currentFilter])

  return (
    <div className="EventsView-root">
      {eventsLoading && <LoadingSpinner />}

      {!eventsLoading && (!events || events.length < 1) && <NoEvents />}

      {!eventsLoading && !!events && events.length > 0 && (
        <React.Fragment>
          <Grid container={true} spacing={3} direction="row">
            <Hidden xsDown={true}>
              <Grid item={true} sm={12}>
                <Link to="/all-events">
                  <Button
                    variant="text"
                    className={
                      currentFilter === 'all'
                        ? 'Eventsview-button-orange'
                        : 'EventsView-button-gray'
                    }
                  >
                    ALL
                  </Button>
                </Link>
                <Link to="/past-events">
                  <Button
                    variant="text"
                    className={
                      currentFilter === 'past'
                        ? 'Eventsview-button-orange'
                        : 'EventsView-button-gray'
                    }
                  >
                    PAST EVENTS
                  </Button>
                </Link>
                <Link to="/upcoming-events">
                  <Button
                    variant="text"
                    className={
                      currentFilter === 'upcoming'
                        ? 'Eventsview-button-orange'
                        : 'EventsView-button-gray'
                    }
                  >
                    UPCOMING EVENTS
                  </Button>
                </Link>
              </Grid>
            </Hidden>
            <Grid item={true} md={12}>
              {visibleEvents.length < 1 && (
                <Typography align="center" variant="body2" gutterBottom={true}>
                  No Events Yet
                </Typography>
              )}

              <div className="Eventsview-list">
                {map(
                  sortBy(visibleEvents, (event: IEvent) =>
                    event.updatedAt ? event.updatedAt : event.createdAt
                  ).reverse(),
                  (event: IEvent) => (
                    <EventBigCard key={event.eventId} event={event} />
                  )
                )}
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  )
}

export default EventsView
