import React, { FC, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps } from 'react-router'
import {
  Action,
  Event,
  LoadingSpinner,
  TrackVoteStatus,
  DecoratedSuggestion
} from 'mm-shared'
import EventFetchError from 'event/EventFetchError'
import EventTracks from './EventTracks'
import EventHeader from './EventHeaderContainer'
import './EventView.scss'

interface EventViewProps extends RouteComponentProps<any> {
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  loading: boolean
  error: Error
  getEventById(eventId: string): Action
  getEventSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventByIdNoLoading(eventId: string): Action
}

const EventView: FC<EventViewProps> = ({
  event,
  match,
  votes,
  suggestions,
  getEventById,
  fetchEventVotes,
  getEventSuggestions,
  loading,
  error
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

  return (
    <Grid className="EventView-root" container>
      <Grid item xs={12}>
        {loading && !isEmpty(error) && (
          <EventFetchError onTryAgain={handleGetEvent} />
        )}
        <EventHeader
          updateRsvp={(x: any): Action => {
            return {} as Action
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <EventTracks votes={votes} event={event} suggestions={suggestions} />
      </Grid>
    </Grid>
  )
}

export default EventView
