import React, { FC, useEffect, useState } from 'react'
import { AppBar, Icon, Tab, Tabs, Typography } from '@material-ui/core'
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
import EventGuests from './EventGuests'
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
    return <LoadingSpinner />
  }

  return (
    <div className="EventView-root">
      {loading && !isEmpty(error) && (
        <EventFetchError onTryAgain={handleGetEvent} />
      )}
      <EventHeader
        updateRsvp={(x: any): Action => {
          return {} as Action
        }}
      />
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="secondary"
            variant="fullWidth"
            classes={{ indicator: 'indicator-color' }}
            className="EventView-tabs"
          >
            <Tab icon={<Icon>library_music</Icon>} className="EventView-tab" />
            <Tab icon={<Icon>location_on</Icon>} className="EventView-tab" />
            <Tab icon={<Icon>account_circle</Icon>} className="EventView-tab" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <Typography component="div">
            <EventTracks
              votes={votes}
              event={event}
              suggestions={suggestions}
            />
          </Typography>
        )}
        {tabIndex === 1 && (
          <Typography component="div" dir={'1'}>
            <p>Hello</p>
          </Typography>
        )}
        {tabIndex === 2 && (
          <Typography component="div" dir={'2'}>
            <EventGuests event={event} />
          </Typography>
        )}
      </div>
    </div>
  )
}

export default EventView
