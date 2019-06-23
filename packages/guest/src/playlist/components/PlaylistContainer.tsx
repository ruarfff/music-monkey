import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import Playlist from './Playlist'
import { setEventId } from '../../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent,
  suggestions: state.suggestion.suggestions,
  votes: state.vote.votes,
  fetchingVotes: state.vote.fetchingVotes
})

const mapDispatchToProps = {
  fetchEventVotes,
  createVote,
  deleteVote,
  setEventId
}

const PlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)

export default PlaylistContainer
