import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import PieChartWidget from './PieChart'
import MostPopularTracks from 'insights/MostPopularTracks'
import MostVotedTracks from 'insights/MostVotedTracks'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IUser from 'user/IUser'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import './Insights.scss'

interface IInsightsProps {
  user: IUser
  event: IEvent
  events: IEvent[]
  pickedEvent: string
  votes: Map<string, ITrackVoteStatus>
  fetchPlaylists(user: IUser): IAction
  filterByEventPick(id: any): IAction
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  fetchEventVotes(eventId: string): IAction
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
    )
  }
}

export default Insights
