import React from 'react'
import { Tab, Tabs, Typography, Grid } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { useSwipeTabsIndex } from 'mm-shared'
import EventSelect from 'event/select/EventSelectContainer'
import AcceptedTracks from './AcceptedTracksContainer'
import MaybeTracks from './MaybeTracksContainer'
import RejectedTracks from './RejectedTracksContainer'
import './Requests.scss'

const Requests = () => {
  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  return (
    <Grid container>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="APPROVED" />
          <Tab label="MAYBE" />
          <Tab label="DECLINED" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <SwipeableViews
          axis="x"
          index={tabIndex}
          onChangeIndex={handleTabChange}
        >
          {tabIndex === 0 ? (
            <Typography component="div" dir="0">
              <AcceptedTracks />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 1 ? (
            <Typography component="div" dir="1">
              <MaybeTracks />
            </Typography>
          ) : (
            <div />
          )}
          {tabIndex === 2 ? (
            <Typography component="div" dir="2">
              <RejectedTracks />
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
