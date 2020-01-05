import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Event } from 'mm-shared'
import EventGuestsRightSideView from './EventGuestsRightSideViewContainer'
import EventDetails from './EventDetailsContainer'
import EventSummaryPlaylist from './EventSummaryPlaylistContainer'
import './EventSummaryView.scss'

interface IEventSummaryViewProps {
  event: Event
}

const EventSummaryView = ({ event }: IEventSummaryViewProps) => {
  return (
    <Grid container={true} spacing={3} className="EventSummary-root">
      <Grid
        container={true}
        spacing={3}
        item={true}
        direction="column"
        justify="flex-start"
        sm={4}
        className="left-side-content"
      >
        <div>
          <EventDetails />
        </div>
      </Grid>
      <Grid
        container={true}
        spacing={3}
        item={true}
        direction="column"
        justify="flex-start"
        sm={4}
        className="left-side-content"
      >
        <div className="playlist-wrapper">
          <EventSummaryPlaylist />
        </div>
      </Grid>
      <Grid item={true} xs={12} sm={4}>
        <EventGuestsRightSideView />
      </Grid>
    </Grid>
  )
}

export default EventSummaryView
