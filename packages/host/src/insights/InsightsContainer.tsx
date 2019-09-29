import { connect } from 'react-redux'
import { getEvents } from '../event/eventActions'
import { sortPlaylistByVotesDescending } from '../event/eventPlaylist/eventPlaylistActions'
import { fetchPlaylists } from '../playlist/playlistActions'
import IRootState from '../rootState'
import { fetchEventVotes } from '../vote/voteActions'
import { filterByEventPick } from './insightsActions'
import './InsightsStyles.scss'
import InsightsView from './InsightsView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  pickedEvent: state.insights.eventId,
  votes: state.vote.votes,
  playlist: state.eventPlaylist.playlist
})

const mapDispatchToProps = {
  getEvents,
  filterByEventPick,
  sortPlaylistByVotesDescending,
  fetchPlaylists,
  fetchEventVotes,
}

const insightsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsView)

export default insightsContainer
