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
  Vote,
  DecoratedSuggestion,
  Suggestion,
  Rsvp,
  EventDetailsView,
  EventGuestView,
  EventSettingsView,
  MaybeTracks,
  EventHeader
} from 'mm-shared'
import EventTracks from './EventTracks'
import './EventView.scss'

interface EventViewProps extends RouteComponentProps<any> {
  isHost: boolean
  user: User
  event: Event
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  pendingRequests: DecoratedSuggestion[]
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
  setEventId(eventId: string): Action
  updateRsvp(rsvp: Rsvp): Action
}

const EventView: FC<EventViewProps> = ({
  isHost,
  user,
  event,
  votes,
  suggestions,
  pendingRequests,
  createVote,
  deleteVote,
  setEventId,
  updateRsvp,
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
    return <MarvinLoader />
  }

  return (
    <Grid className="EventView-root" container>
      <Switch>
        <Route path={`/events/${event.eventId}/details`}>
          <EventDetailsView user={user} event={event} isHost={false} />
        </Route>
        <Route path={`/events/${event.eventId}/guests`}>
          <EventGuestView user={user} event={event} isHost={false} />
        </Route>
        <Route path={`/events/${event.eventId}/settings`}>
          <EventSettingsView user={user} event={event} isHost={false} />
        </Route>
        <Route path={`/events/${event.eventId}`}>
          <Grid item xs={12}>
            <EventHeader
              user={user}
              event={event}
              isHost={isHost}
              updateRsvp={updateRsvp}
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
            <Typography component="div" dir="0" hidden={tabIndex !== 0}>
              <EventTracks
                user={user}
                createVote={createVote}
                deleteVote={deleteVote}
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
                showAll={true}
                onAccept={(s: Suggestion) => {}}
                onReject={(s: Suggestion) => {}}
              />
            </Typography>
          </Grid>
        </Route>
      </Switch>
    </Grid>
  )
}

export default withRouter(EventView)
