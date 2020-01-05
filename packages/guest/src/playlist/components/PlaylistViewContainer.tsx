import { connect } from 'react-redux'
import IRootState from 'rootState'
import { createVote, deleteVote } from 'mm-shared'
import { setEventId } from 'event/eventActions'
import PlaylistView from './PlaylistView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent,
  suggestions: state.suggestion.suggestions,
  votes: state.vote.votes,
  fetchingVotes: state.vote.fetchingVotes
})

const mapDispatchToProps = {
  createVote,
  deleteVote,
  setEventId
}

const PlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistView)

export default PlaylistContainer
