import React, { FC, useEffect, useState } from 'react'
import { Grid, AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps, Route, Switch, withRouter } from 'react-router'
import {
  User,
  Action,
  Event,
  MarvinLoader,
  TrackVoteStatus,
  DecoratedSuggestion,
  EventDetailsView,
  EventGuestView,
  EventSettingsView,
  EventHeader
} from 'mm-shared'
import EventFetchError from 'event/EventFetchError'
import EventTracks from './EventTracks'
import SaveEvent from 'event/saveEvent/SaveEventContainer'
import EditEventView from 'event/saveEvent/EditEventViewContainer'

import './EventView.scss'

interface EventViewProps extends RouteComponentProps<any> {
  isHost: boolean
  user: User
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  loading: boolean
  error: Error
  getEventById(eventId: string): Action
  getEventSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventByIdNoLoading(eventId: string): Action
  deselectEvent(): Action
}

const EventView: FC<EventViewProps> = ({
  isHost,
  user,
  event,
  match,
  votes,
  suggestions,
  error,
  getEventById,
  fetchEventVotes,
  getEventSuggestions,
  loading,
  deselectEvent
}) => {
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  useEffect(() => {
    if (!event || event.eventId !== eventId) {
      getEventById(eventId)
      fetchEventVotes(eventId)
      getEventSuggestions(eventId)
    }
  }, [event, eventId, fetchEventVotes, getEventById, getEventSuggestions])

  const shouldShowEvent: boolean = !loading && !isEmpty(event)

  const handleGetEvent = () => {
    getEventById(eventId)
  }

  if (!shouldShowEvent) {
    return <MarvinLoader />
  }

  if (loading && !isEmpty(error)) {
    return (
      <Grid className="EventView-root" container>
        <EventFetchError onTryAgain={handleGetEvent} />
      </Grid>
    )
  }
  return (
    <Grid className="EventView-root" container>
      <Switch>
        <Route path={`/events/${event.eventId}/details`}>
          <EventDetailsView
            user={user}
            event={event}
            deselectEvent={deselectEvent}
          />
        </Route>
        <Route path={`/events/${event.eventId}/guests`}>
          <EventGuestView
            user={user}
            event={event}
            deselectEvent={deselectEvent}
          />
        </Route>
        <Route path={`/events/${event.eventId}/settings`}>
          <EventSettingsView
            user={user}
            event={event}
            deselectEvent={deselectEvent}
          />
        </Route>
        <Route path={`/events/${event.eventId}/edit`}>
          <EditEventView />
        </Route>
        <Route path={`/events/${event.eventId}/save`}>
          <SaveEvent />
        </Route>
        <Route path={`/events/${event.eventId}`}>
          <Grid item xs={12}>
            <EventHeader
              user={user}
              event={event}
              isHost={isHost}
              deselectEvent={deselectEvent}
            />
          </Grid>
          <Grid item xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="PLAYLIST" />
                <Tab label="REQUESTS" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis="x"
              index={tabIndex}
              onChangeIndex={handleTabChange}
            >
              <Typography component="div" dir="0">
                <EventTracks
                  votes={votes}
                  event={event}
                  suggestions={suggestions}
                />
              </Typography>
              <Typography component="div" dir="0">
                <h1>Requests</h1>
              </Typography>
            </SwipeableViews>
          </Grid>
        </Route>
      </Switch>
    </Grid>
  )
}

export default withRouter(EventView)
