import React, { FC, useEffect, useState } from 'react'
import { Grid, AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps, Route, Switch, withRouter } from 'react-router'
import {
  Action,
  User,
  Event,
  MarvinLoader,
  TrackVoteStatus,
  DecoratedSuggestion,
  EventDetailsView,
  EventGuestView,
  EventSettingsView,
  EventHeader,
  MaybeTracks,
  Suggestion,
  acceptRequest,
  rejectRequest,
  useSnackbarAlert
} from 'mm-shared'
import { updateEvent } from 'event/eventClient'
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
  error: Error
  pendingRequests: DecoratedSuggestion[]
  getEventById(eventId: string): Action
  getEventSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
}

const EventView: FC<EventViewProps> = ({
  isHost,
  user,
  event,
  match,
  votes,
  suggestions,
  error,
  pendingRequests,
  getEventById,
  fetchEventVotes,
  getEventSuggestions
}) => {
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const { showSuccess } = useSnackbarAlert()

  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  useEffect(() => {
    if (!event || event.eventId !== eventId) {
      getEventById(eventId)
      fetchEventVotes(eventId)
      getEventSuggestions(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, eventId])

  const shouldShowEvent: boolean = !isEmpty(event)

  const handleGetEvent = () => {
    getEventById(eventId)
  }

  const handleRejectRequest = (request: Suggestion) => {
    showSuccess('Request rejected')
    rejectRequest(request)
  }

  const handleAcceptRequest = (request: Suggestion) => {
    showSuccess('Request accepted')
    acceptRequest(request)
  }

  if (!shouldShowEvent) {
    return <MarvinLoader />
  }

  if (!isEmpty(error)) {
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
            isHost={true}
            updateEvent={updateEvent}
          />
        </Route>
        <Route path={`/events/${event.eventId}/guests`}>
          <EventGuestView user={user} event={event} isHost={true} />
        </Route>
        <Route path={`/events/${event.eventId}/settings`}>
          <EventSettingsView
            user={user}
            event={event}
            isHost={true}
            updateEvent={updateEvent}
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
            <EventHeader user={user} event={event} isHost={isHost} />
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

            <Typography component="div" dir="0" hidden={tabIndex !== 0}>
              <EventTracks
                votes={votes}
                event={event}
                suggestions={suggestions}
              />
            </Typography>
            <Typography component="div" dir="1" hidden={tabIndex !== 1}>
              <MaybeTracks
                isHost={isHost}
                user={user}
                event={event}
                requests={pendingRequests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            </Typography>
          </Grid>
        </Route>
      </Switch>
    </Grid>
  )
}

export default withRouter(EventView)
