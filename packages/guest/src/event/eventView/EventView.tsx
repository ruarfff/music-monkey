import React, { FC, useEffect, useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { isEmpty } from 'lodash'
import { RouteComponentProps } from 'react-router'
import {
  Action,
  User,
  Event,
  LoadingSpinner,
  TrackVoteStatus,
  Vote
} from 'mm-shared'
import EventDetails from './EventDetails'
import EventGuests from './EventGuests'
import EventLocation from './EventLocation'
import EventHeader from './EventHeaderContainer'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import './EventView.scss'

interface EventViewProps extends RouteComponentProps<any> {
  user: User
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: IDecoratedSuggestion[]
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
  setEventId(eventId: string): Action
}

const EventView: FC<EventViewProps> = ({
  user,
  event,
  votes,
  suggestions,
  createVote,
  deleteVote,
  setEventId,
  match
}) => {
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  // handleVotes
  useEffect(() => {
    if (eventId !== event.eventId) setEventId(eventId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  if (isEmpty(event)) {
    return <LoadingSpinner />
  }

  return (
    <div className="EventView-root">
      <EventHeader />
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
            <EventDetails
              user={user}
              createVote={createVote}
              deleteVote={deleteVote}
              votes={votes}
              event={event}
              suggestions={suggestions}
            />
          </Typography>
        )}
        {tabIndex === 1 && (
          <Typography component="div" dir={'1'}>
            <EventLocation event={event} />
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
