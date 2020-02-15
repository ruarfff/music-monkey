import React, { FC, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps, Route, Switch, withRouter } from 'react-router'
import {
  User,
  Action,
  Event,
  LoadingSpinner,
  TrackVoteStatus,
  DecoratedSuggestion,
  EventDetailsView,
  EventGuestView,
  EventSettingsView,
  EventHeader
} from 'mm-shared'
import EventFetchError from 'event/EventFetchError'
import EventTracks from './EventTracks'
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
    return <LoadingSpinner />
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
            <EventTracks
              votes={votes}
              event={event}
              suggestions={suggestions}
            />
          </Grid>
        </Route>
      </Switch>
    </Grid>
  )
}

export default withRouter(EventView)
