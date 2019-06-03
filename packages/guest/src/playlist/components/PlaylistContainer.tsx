import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { getSuggestions } from '../../suggestion/suggestionActions'
import { deselectTrack, selectTrack } from '../../track/trackActions'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import Playlist from './Playlist'
import { setEventId } from '../../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent,
  votes: state.vote.votes,
  selectedTrack: state.track.selectedTrack,
  fetchingVotes: state.vote.fetchingVotes
})

const mapDispatchToProps = {
  fetchEventVotes,
  createVote,
  deleteVote,
  selectTrack,
  deselectTrack,
  getSuggestions,
  setEventId
}

const PlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)

export default PlaylistContainer
