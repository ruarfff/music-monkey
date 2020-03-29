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
  Vote,
  DecoratedSuggestion,
  Rsvp,
  EventDetailsView,
  EventGuestView,
  EventSettingsView,
  MaybeTracks,
  EventHeader,
  notificationContext
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
  match,
  location
}) => {
  const {
    notification: { acceptedTracks, requestedTracks },
    setNotification
  } = useContext(notificationContext)
  const eventId = match.params.eventId
  const [tabIndex, setTabIndex] = useState(0)
  const [newTrackCount, setNewTrackCount] = useState(0)
  const [requestedTrackCount, setRequestedTrackCount] = useState(0)
  const [newTracks, setNewTracks] = useState(acceptedTracks)
  const [newRequests, setNewRequests] = useState(requestedTracks)

  const handleTabChange = (e: any, value: any) => {
    setTabIndex(value)
  }

  useEffect(() => {
    const ntCount = acceptedTracks.length
    if (newTrackCount !== ntCount) {
      setNewTrackCount(ntCount)
    }
    if (!isEmpty(acceptedTracks)) {
      if (!isEqual(acceptedTracks, newTracks)) {
        setNewTracks(acceptedTracks.sort())
      }
    }

    const rtCount = requestedTracks.length
    if (requestedTrackCount !== rtCount) {
      setRequestedTrackCount(rtCount)
    }
    if (!isEmpty(requestedTracks)) {
      if (!isEqual(requestedTracks, newRequests)) {
        setNewRequests(requestedTracks.sort())
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedTracks, requestedTracks])

  useEffect(() => {
    if (eventId !== event.eventId) setEventId(eventId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  useEffect(() => {
    return () => {
      setNotification({ type: 'clear' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

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
                user={user}
                createVote={createVote}
                deleteVote={deleteVote}
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
                showAll={true}
              />
            </Typography>
          </Grid>
        </Route>
      </Switch>
    </Grid>
  )
}

export default withRouter(EventView)
