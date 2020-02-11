import { connect } from 'react-redux'
import { sortPlaylistByVotesDescending } from 'event/eventActions'
import { fetchPlaylists } from 'playlist/playlistActions'
import IRootState from 'rootState'
import { fetchEventVotes } from 'mm-shared'
import Insights from './Insights'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  votes: state.vote.votes
})

const mapDispatchToProps = {
  sortPlaylistByVotesDescending,
  fetchPlaylists,
  fetchEventVotes
}

const insightsContainer = connect(mapStateToProps, mapDispatchToProps)(Insights)

export default insightsContainer
