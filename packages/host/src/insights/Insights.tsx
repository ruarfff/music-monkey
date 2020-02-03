import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import EventSelect from 'event/select/EventSelectContainer'
import PieChartWidget from './PieChart'
import MostPopularTracks from 'insights/MostPopularTracks'
import MostVotedTracks from 'insights/MostVotedTracks'
import { Event } from 'mm-shared'
import { Action, User, TrackVoteStatus, Playlist } from 'mm-shared'
import './Insights.scss'

interface IInsightsProps {
  user: User
  event: Event
  events: Event[]
  pickedEvent: string
  votes: Map<string, TrackVoteStatus>
  fetchPlaylists(user: User): Action
  filterByEventPick(id: any): Action
  sortPlaylistByVotesDescending(
    playlist: Playlist,
    votes: Map<string, TrackVoteStatus>
  ): Action
  fetchEventVotes(eventId: string): Action
}

class Insights extends React.Component<IInsightsProps> {
  public componentDidMount() {
    if (this.props.user) {
      this.props.fetchPlaylists(this.props.user)
    }
  }

  public render() {
    const {
      event,
      events,
      pickedEvent,
      votes,
      filterByEventPick,
      sortPlaylistByVotesDescending,
      fetchEventVotes
    } = this.props

    return (
      <div>
        <EventSelect />
        <div className="insightsContainer">
          <Typography>Tracks Statistic</Typography>
          <Grid container={true} spacing={3}>
            <Grid item={true} md={6}>
              <MostPopularTracks events={events} />
            </Grid>
            <Grid item={true} md={6}>
              <MostVotedTracks
                events={events}
                votes={votes}
                sortPlaylistByVotesDescending={sortPlaylistByVotesDescending}
                fetchEventVotes={fetchEventVotes}
                playlist={event.playlist!}
              />
            </Grid>
          </Grid>
          <Typography>Guests Statistic</Typography>
          <Grid container={true} spacing={3}>
            <Grid item={true} md={6}>
              <PieChartWidget
                filterByEventPick={filterByEventPick}
                pickedEvent={pickedEvent}
                events={events}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Insights
