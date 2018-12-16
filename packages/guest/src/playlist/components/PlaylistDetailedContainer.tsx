import { connect } from 'react-redux'
import { getEvent } from '../../event/eventActions'
import { showSpinner } from '../../navigation/activeActions'
import IRootState from '../../rootState'
import {
  getSuggestions,
  getUsersSuggestions
} from '../../suggestion/suggestionActions'
import { deselectTrack, selectTrack } from '../../track/trackActions'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import { onPlaylistSelected } from '../playlistActions'
import PlaylistDetailed from './PlaylistDetailed'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent,
  events: state.event.events,
  userPlaylists: state.playlist.eventPlaylists,
  selectedPlaylist: state.playlist.selectedPlaylist,
  votes: state.vote.votes,
  selectedTrack: state.track.selectedTrack,
  suggestions: state.suggestion.suggestions,
  fetchingSuggestions: state.suggestion.fetchingSuggestions,
  fetchingVotes: state.vote.fetchingVotes
})

const mapDispatchToProps = {
  showSpinner,
  createVote,
  deleteVote,
  selectTrack,
  fetchEventVotes,
  onPlaylistSelected,
  deselectTrack,
  getSuggestions,
  getEvent,
  getUsersSuggestions
}

const PlaylistDetailedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailed)

export default PlaylistDetailedContainer
