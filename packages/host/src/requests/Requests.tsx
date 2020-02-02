import React from 'react'
import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
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
    <div>
      <EventSelect />
      <Divider variant="inset" className="Requests-divider" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          classes={{ indicator: 'indicator-color' }}
        >
          <Tab label="APPROVED" />
          <Tab label="MAYBE" />
          <Tab label="DECLINED" />
        </Tabs>
      </AppBar>
      <SwipeableViews axis="x" index={tabIndex} onChangeIndex={handleTabChange}>
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
    </div>
  )
}

export default Requests
