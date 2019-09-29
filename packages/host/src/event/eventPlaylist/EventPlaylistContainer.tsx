import { connect } from 'react-redux'
import { getTracksFeatures, tryRemoveTrack } from 'playlist/playlistActions'
import IRootState from 'rootState'
import { resetStagedSuggestions } from 'suggestion/suggestionActions'
import EventPlaylist from './EventPlaylist'
import {
  moveItemInEventPlaylist,
  saveEventPlaylist,
  sortPlaylistByVotesDescending
} from './eventPlaylistActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event,
  playlist: state.eventPlaylist.playlist,
  notification: state.playlist.notification,
  saving: state.eventPlaylist.savingEventPlaylist,
  stagedSuggestions: state.suggestion.stagedSuggestions,
  votes: state.vote.votes,
  tracksWithFeatures: state.playlist.tracksWithFeatures
})

const mapDispatchToProps = {
  saveEventPlaylist,
  resetStagedSuggestions,
  onPlaylistDragDrop: moveItemInEventPlaylist,
  sortPlaylistByVotesDescending,
  tryRemoveTrack,
  getTracksFeatures
}

const PreGameViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPlaylist)

export default PreGameViewContainer
