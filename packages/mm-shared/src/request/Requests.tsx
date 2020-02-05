import React, { FC } from 'react'
import { Tab, Tabs, Typography, Grid, AppBar } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { useSwipeTabsIndex } from '../'
import AcceptedTracks from './AcceptedTracksContainer'
import MaybeTracks from './MaybeTracksContainer'
import RejectedTracks from './RejectedTracksContainer'
import './Requests.scss'

interface RequestsProps {
  isHost?: boolean
}

const Requests: FC<RequestsProps> = ({ isHost = false }) => {
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
              <AcceptedTracks isHost={isHost} />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 1 ? (
            <Typography component="div" dir="1">
              <MaybeTracks isHost={isHost} />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 2 ? (
            <Typography component="div" dir="2">
              <RejectedTracks isHost={isHost} />
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
