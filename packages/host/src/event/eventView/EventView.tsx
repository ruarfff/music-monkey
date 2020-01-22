import React, { FC, useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Typography from '@material-ui/core/Typography/Typography'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps } from 'react-router'
import { Action, Event, LoadingSpinner } from 'mm-shared'
import InviteCopyAlert from 'components/InviteLink/InviteCopyAlert'
import EventFetchError from 'event/EventFetchError'
import EventGuests from './EventGuestsContainer'
import EventPlaylistView from './EventPlaylistViewContainer'
import EventSummaryView from './EventSummaryViewContainer'
import EventHeader from './EventHeaderContainer'
import './EventView.scss'

interface EventViewProps extends RouteComponentProps<any> {
  error: Error
  event: Event
  loading: boolean
  copiedToClipboard: boolean
  getEventById(eventId: string): Action
  copyEventInvite(): Action
  acknowledgeEventInviteCopied(): Action
  getEventSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventByIdNoLoading(eventId: string): Action
}

const EventView: FC<EventViewProps> = ({
  event,
  match,
  getEventById,
  fetchEventVotes,
  getEventSuggestions,
  loading,
  error,
  copiedToClipboard,
  acknowledgeEventInviteCopied
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
            <Tab className="EventView-tab" label="Event Summary" />
            <Tab className="EventView-tab" label="Playlist" />
            <Tab className="EventView-tab" label="Guest List" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <Typography component="div">
            <EventSummaryView />
          </Typography>
        )}
        {tabIndex === 1 && (
          <Typography component="div" dir={'1'}>
            <EventPlaylistView />
          </Typography>
        )}
        {tabIndex === 2 && (
          <Typography component="div" dir={'2'}>
            <EventGuests />
          </Typography>
        )}
      </div>

      {copiedToClipboard && (
        <InviteCopyAlert
          message="Copied to Clipboard"
          onClose={acknowledgeEventInviteCopied}
        />
      )}
    </div>
  )
}

export default EventView
