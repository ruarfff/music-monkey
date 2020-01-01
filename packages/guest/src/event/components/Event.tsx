import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { isEmpty } from 'lodash'
import { RouteComponentProps } from 'react-router'
import { Action } from 'mm-shared'
import LoadingSpinner from '../../loading/LoadingSpinner'
import IUser from '../../user/IUser'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IEvent from '../IEvent'
import EventDetails from './EventDetails'
import EventGuests from './EventGuests'
import EventLocation from './EventLocation'
import React, { useEffect, useState } from 'react'
import EventHeader from './EventHeaderContainer'
import './Event.scss'

interface IEventProps {
  user: IUser
  selectedEvent: IEvent
  eventLoading: boolean
  votes: Map<string, ITrackVoteStatus>
  fetchingVotes: boolean
  createVote(vote: IVote): Action
  deleteVote(voteId: string): Action
  setEventId(eventId: string): Action
}

const Event = ({
  user,
  selectedEvent,
  setEventId,
  votes,
  createVote,
  deleteVote,
  match
}: IEventProps & RouteComponentProps<any>) => {
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  // handleVotes
  useEffect(() => {
    if (eventId !== selectedEvent.eventId) setEventId(eventId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  if (isEmpty(selectedEvent)) {
    return <LoadingSpinner />
  }

  return (
    <div className="Event-root">
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
            className="Event-tabs"
          >
            <Tab icon={<Icon>library_music</Icon>} className="Event-tab" />
            <Tab icon={<Icon>location_on</Icon>} className="Event-tab" />
            <Tab icon={<Icon>account_circle</Icon>} className="Event-tab" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <Typography component="div">
            <EventDetails
              user={user}
              createVote={createVote}
              deleteVote={deleteVote}
              votes={votes}
              event={selectedEvent}
            />
          </Typography>
        )}
        {tabIndex === 1 && (
          <Typography component="div" dir={'1'}>
            <EventLocation event={selectedEvent} />
          </Typography>
        )}
        {tabIndex === 2 && (
          <Typography component="div" dir={'2'}>
            <EventGuests event={selectedEvent} />
          </Typography>
        )}
      </div>
    </div>
  )
}

export default Event
