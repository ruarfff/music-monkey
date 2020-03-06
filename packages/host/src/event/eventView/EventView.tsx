import React, { FC, useEffect, useState, useContext } from 'react'
import { Grid, AppBar, Tab, Tabs, Typography, Badge } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
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
  useSnackbarAlert,
  NotificationContext
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
  const {
    acceptedTracks,
    updateAcceptedTracks,
    requestedTracks,
    updateRequestedTracks
  } = useContext(NotificationContext)
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const { showSuccess } = useSnackbarAlert()
  const [newTrackCount, setNewTrackCount] = useState(0)
  const [requestedTrackCount, setRequestedTrackCount] = useState(0)
  const [newTracks, setNewTracks] = useState(acceptedTracks)
  const [newRequests, setNewRequests] = useState(requestedTracks)

  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  useEffect(() => {
    if (!isEmpty(acceptedTracks)) {
      const count = acceptedTracks.length
      if (newTrackCount !== count) {
        setNewTrackCount(count)
      }
      if (!isEqual(acceptedTracks, newTracks)) {
        setNewTracks(acceptedTracks.sort())
      }
    }
    return () => {
      if (!isEmpty(acceptedTracks)) {
        updateAcceptedTracks([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedTracks])
  
    useEffect(() => {
    if (!isEmpty(requestedTracks)) {
      const count = requestedTracks.length
      if (requestedTrackCount !== count) {
        setRequestedTrackCount(count)
      }

      if (!isEqual(requestedTracks, newRequests)) {
        setNewRequests(requestedTracks.sort())
      }
    }
    return () => {
      if (!isEmpty(requestedTracks)) {
        updateRequestedTracks([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedTracks])

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
                <Tab
                  label={
                    <Badge
                      color="secondary"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      badgeContent={newTrackCount}
                      invisible={newTrackCount < 1}
                    >
                      PLAYLIST
                    </Badge>
                  }
                />

                <Tab
                  label={
                    <Badge
                      color="secondary"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      badgeContent={requestedTrackCount}
                      invisible={requestedTrackCount < 1}
                    >
                      REQUESTS
                    </Badge>
                  }
                />
              </Tabs>
            </AppBar>

            <Typography component="div" dir="0" hidden={tabIndex !== 0}>
              <EventTracks
                votes={votes}
                event={event}
                suggestions={suggestions}
                acceptedTracks={newTracks}
              />
            </Typography>
            <Typography component="div" dir="1" hidden={tabIndex !== 1}>
              <MaybeTracks
                isHost={isHost}
                user={user}
                event={event}
                requests={pendingRequests}
                newRequests={newRequests}
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
