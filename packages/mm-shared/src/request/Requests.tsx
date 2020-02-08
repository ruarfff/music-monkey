import React, { FC } from 'react'
import { Tab, Tabs, Typography, Grid, AppBar } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { useSwipeTabsIndex, Suggestion } from '../'
import { User } from 'user'
import { Event } from 'event'
import AcceptedTracks from './AcceptedTracks'
import MaybeTracks from './MaybeTracks'
import RejectedTracks from './RejectedTracks'
import { DecoratedSuggestion } from './DecoratedSuggestion'
import './Requests.scss'

interface RequestsProps {
  isHost?: boolean
  user: User
  event: Event
  acceptedRequests: DecoratedSuggestion[]
  rejectedRequests: DecoratedSuggestion[]
  pendingRequests: DecoratedSuggestion[]
  onAccept?(request: Suggestion): void
  onReject?(request: Suggestion): void
}

const Requests: FC<RequestsProps> = ({
  isHost = false,
  user,
  acceptedRequests,
  rejectedRequests,
  pendingRequests,
  event,
  onAccept = () => {},
  onReject = () => {}
}) => {
  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="REQUESTED" />
            <Tab label="APPROVED" />
            <Tab label="DECLINED" />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <SwipeableViews
          axis="x"
          index={tabIndex}
          onChangeIndex={handleTabChange}
        >
          {tabIndex === 0 ? (
            <Typography component="div" dir="0">
              <MaybeTracks
                isHost={isHost}
                user={user}
                requests={pendingRequests}
                event={event}
                onAccept={onAccept}
                onReject={onReject}
              />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 1 ? (
            <Typography component="div" dir="1">
              <AcceptedTracks
                isHost={isHost}
                user={user}
                requests={acceptedRequests}
                onReject={onReject}
              />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 2 ? (
            <Typography component="div" dir="2">
              <RejectedTracks
                isHost={isHost}
                user={user}
                requests={rejectedRequests}
                onAccept={onAccept}
              />
            </Typography>
          ) : (
            <div />
          )}
        </SwipeableViews>
      </Grid>
    </Grid>
  )
}

export default Requests
