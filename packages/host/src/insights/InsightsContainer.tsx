import { connect } from 'react-redux'
import { sortPlaylistByVotesDescending, getEvents } from 'event/eventActions'
import { fetchPlaylists } from 'playlist/playlistActions'
import IRootState from 'rootState'
import { fetchEventVotes } from 'vote/voteActions'
import { filterByEventPick } from './insightsActions'
import Insights from './Insights'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  events: state.event.events,
  pickedEvent: state.insights.eventId,
  votes: state.vote.votes
})

const mapDispatchToProps = {
  getEvents,
  filterByEventPick,
  sortPlaylistByVotesDescending,
  fetchPlaylists,
  fetchEventVotes
}

const insightsContainer = connect(mapStateToProps, mapDispatchToProps)(Insights)

export default insightsContainer
