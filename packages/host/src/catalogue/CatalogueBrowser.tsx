import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Hidden from '@material-ui/core/Hidden'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Action } from 'mm-shared'
import IEvent from 'event/IEvent'
import NoEvents from 'event/NoEvents'
import LoadingSpinner from 'loading/LoadingSpinner'
import EventCard from 'catalogue/EventCard'
import { event, playlist } from './CatalogueType'
import { all, upcoming, past } from './FilterType'
import PlaylistCard from './PlaylistCard'
import './CatalogueBrowser.scss'

const pathToFilter = {
  '/catalogue': {
    filter: all,
    type: event
  },
  '/catalogue/all-events': {
    filter: all,
    type: event
  },
  '/catalogue/past-events': {
    filter: past,
    type: event
  },
  '/catalogue/upcoming-events': {
    filter: upcoming,
    type: event
  },
  '/catalogue/all-playlists': {
    filter: all,
    type: playlist
  },
  '/catalogue/past-playlists': {
    filter: past,
    type: playlist
  },
  '/catalogue/upcoming-playlists': {
    filter: upcoming,
    type: playlist
  }
}
interface ICatalogueBrowserProps extends RouteComponentProps {
  events: IEvent[]
  eventsLoading: boolean
  getEvents(): Action
}

const CatalogueBrowser = ({
  events = [],
  eventsLoading,
  getEvents,
  location
}: ICatalogueBrowserProps) => {
  const now = moment()
  const currentFilter = pathToFilter[location.pathname]
  const orderedEvents = sortBy(events, (event: IEvent) =>
    event.updatedAt ? event.updatedAt : event.createdAt
  ).reverse()
  const [visibleEvents, setVisibleEvents] = useState(orderedEvents)

  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }

    if (currentFilter.filter === all) {
      setVisibleEvents(orderedEvents)
    } else if (currentFilter.filter === past) {
      setVisibleEvents(
        orderedEvents.filter(event => event.startDateTime.isBefore(now))
      )
    } else if (currentFilter.filter === upcoming) {
      setVisibleEvents(
        orderedEvents.filter(event => event.startDateTime.isAfter(now))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsLoading, currentFilter])

  return (
    <div className="CatalogueBrowser-root">
      {eventsLoading && <LoadingSpinner />}

      {!eventsLoading && isEmpty(events) && <NoEvents />}

      {!eventsLoading && !isEmpty(events) && (
        <Grid container={true} spacing={3} direction="row">
          <Hidden xsDown={true}>
            <Grid item={true} sm={12}>
              <Link
                to={
                  currentFilter.type === event
                    ? '/catalogue/all-events'
                    : '/catalogue/all-playlists'
                }
              >
                <Button
                  variant="text"
                  color={currentFilter.filter === all ? 'primary' : 'secondary'}
                >
                  ALL
                </Button>
              </Link>
              <Link
                to={
                  currentFilter.type === event
                    ? '/catalogue/past-events'
                    : '/catalogue/past-playlists'
                }
              >
                <Button
                  variant="text"
                  color={
                    currentFilter.filter === past ? 'primary' : 'secondary'
                  }
                >
                  PAST
                </Button>
              </Link>
              <Link
                to={
                  currentFilter.type === event
                    ? '/catalogue/upcoming-events'
                    : '/catalogue/upcoming-playlists'
                }
              >
                <Button
                  variant="text"
                  color={
                    currentFilter.filter === upcoming ? 'primary' : 'secondary'
                  }
                >
                  UPCOMING
                </Button>
              </Link>
            </Grid>
          </Hidden>
          <Grid item={true} md={12}>
            <div className="CatalogueBrowser-list">
              {map(visibleEvents, (event: IEvent) => {
                if (currentFilter.type === playlist) {
                  return (
                    <PlaylistCard
                      key={event.eventId}
                      eventId={event.eventId!}
                      playlist={event.playlist!}
                    />
                  )
                }

                return <EventCard key={event.eventId} event={event} />
              })}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default CatalogueBrowser
