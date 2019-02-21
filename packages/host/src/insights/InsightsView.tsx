import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import PieChartWidget from '../components/Charts/PieChart'
import MostPopularTracks from '../components/TraksStatistic/MostPopularTracks'
import MostVotedTracks from '../components/TraksStatistic/MostVotedTracks'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IUser from '../user/IUser'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'

interface IInsightsViewProps {
  user: IUser
  events: IEvent[]
  pickedEvent: string
  votes: Map<string, ITrackVoteStatus>
  playlist: IPlaylist
  getEvents(): IAction
  fetchPlaylists(user: IUser): IAction
  filterByEventPick(id: any): IAction
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  fetchEventVotes(eventId: string): IAction
}

class InsightsView extends React.Component<IInsightsViewProps> {

  public componentDidMount() {
    this.props.getEvents()
    if (this.props.user) {
      this.props.fetchPlaylists(this.props.user)
    }
  }

  public render() {
    const {
      events,
      pickedEvent,
      votes,
      playlist,
      filterByEventPick,
      sortPlaylistByVotesDescending,
      fetchEventVotes
    } = this.props

    return (
      <div className="insightsContainer">
        <Typography>
          Tracks Statistic
        </Typography>
        <Grid container={true} spacing={24}>
          <Grid item={true} md={6}>
            <MostPopularTracks events={events} />
          </Grid>
          <Grid item={true} md={6}>
            <MostVotedTracks
              events={events}
              votes={votes}
              sortPlaylistByVotesDescending={sortPlaylistByVotesDescending}
              fetchEventVotes={fetchEventVotes}
              playlist={playlist}
            />
          </Grid>
        </Grid>
        <Typography>
          Guests Statistic
        </Typography>
        <Grid container={true} spacing={24}>
          <Grid item={true} md={6}>
            <PieChartWidget filterByEventPick={filterByEventPick} pickedEvent={pickedEvent} events={events} />
          </Grid>
          <Grid item={true} md={6}>
          </Grid>
        </Grid>
      </div>
    )
  }


}

export default InsightsView
