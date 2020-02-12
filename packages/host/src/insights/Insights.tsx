import React, { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import EventSelect from 'event/select/EventSelectContainer'
import PieChartWidget from './PieChart'
import MostPopularTracks from 'insights/MostPopularTracks'
import { Event } from 'mm-shared'
import { Action, User, TrackVoteStatus, Playlist } from 'mm-shared'
import './Insights.scss'

interface InsightsProps {
  user: User
  event: Event
  events: Event[]
  votes: Map<string, TrackVoteStatus>
  sortPlaylistByVotesDescending(
    playlist: Playlist,
    votes: Map<string, TrackVoteStatus>
  ): Action
  fetchEventVotes(eventId: string): Action
}

const Insights: FC<InsightsProps> = ({
  user,
  event,
  events,
  votes,
  sortPlaylistByVotesDescending,
  fetchEventVotes
}) => {
  return (
    <Grid container spacing={2} className="Insights-root">
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item={true} xs={12}>
        <MostPopularTracks events={events} />
      </Grid>
      <Grid item={true} xs={12}>
        <PieChartWidget event={event} events={events} />
      </Grid>
    </Grid>
  )
}

export default Insights
