import { connect } from 'react-redux'
import IRootState from '../../rootState'
import {
  getSuggestions,
  getUsersSuggestions
} from '../../suggestion/suggestionActions'
import { deselectTrack, selectTrack } from '../../track/trackActions'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import { onPlaylistSelected } from '../playlistActions'
import PlaylistDetailed from './PlaylistDetailed'
import { setEventId } from '../../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent,
  eventLoading: state.event.eventLoading,
  userPlaylists: state.playlist.eventPlaylists,
  selectedPlaylist: state.playlist.selectedPlaylist,
  votes: state.vote.votes,
  selectedTrack: state.track.selectedTrack,
  suggestions: state.suggestion.suggestions,
  fetchingSuggestions: state.suggestion.fetchingSuggestions,
  fetchingVotes: state.vote.fetchingVotes
})

const mapDispatchToProps = {
  createVote,
  deleteVote,
  selectTrack,
  fetchEventVotes,
  onPlaylistSelected,
  deselectTrack,
  getSuggestions,
  getUsersSuggestions,
  setEventId
}

const PlaylistDetailedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailed)

export default PlaylistDetailedContainer
