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
import CatalogueCard from 'event/catalogue/CatalogueCard'
import eventIcon from 'assets/date-icon.svg'
import locationIcon from 'assets/location-marker-icon.svg'
import './CatalogueBrowser.scss'

const pathToFilter = {
  '/catalogue/all-events': 'all',
  '/catalogue/past-events': 'past',
  '/catalogue/upcoming-events': 'upcoming',
  '/catalogue/all-playlists': '',
  '/catalogue/past-playlists': '',
  '/catalogue/upcoming-playlists': ''
}
interface ICatalogueBrowserProps extends RouteComponentProps {
  events: IEvent[]

  eventsLoading: boolean
  getEvents(): IAction
}

const CatalogueBrowser = ({
  events = [],
  eventsLoading,
  getEvents,
  location
}: ICatalogueBrowserProps) => {
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

  const eventCard = (event: IEvent) => {
    const descriptionLines = [
      {
        image: eventIcon,
        text: event.startDateTime
          ? event.startDateTime.format('Do MMMM YYYY')
          : ''
      },
      {
        image: locationIcon,
        text: event.location ? event.location.address : ''
      }
    ]

    const cardActions = [
      { link: '/events/' + event.eventId, text: 'GO TO EVENT' },
      { link: '/events/' + event.eventId + '/edit', text: 'EDIT EVENT' }
    ]
    return (
      <CatalogueCard
        key={event.eventId}
        link={'/events/' + event.eventId}
        imageUrl={event.imageUrl}
        title={event.name}
        descriptionLines={descriptionLines}
        cardActions={cardActions}
      />
    )
  }
  return (
    <div className="CatalogueBrowser-root">
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
                        ? 'CatalogueBrowser-button-orange'
                        : 'CatalogueBrowser-button-gray'
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
                        ? 'CatalogueBrowser-button-orange'
                        : 'CatalogueBrowser-button-gray'
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
                        ? 'CatalogueBrowser-button-orange'
                        : 'CatalogueBrowser-button-gray'
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

              <div className="CatalogueBrowser-list">
                {map(
                  sortBy(visibleEvents, (event: IEvent) =>
                    event.updatedAt ? event.updatedAt : event.createdAt
                  ).reverse(),
                  eventCard
                )}
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  )
}

export default CatalogueBrowser
