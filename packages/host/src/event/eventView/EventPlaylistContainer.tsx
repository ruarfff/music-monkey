import { connect } from 'react-redux'
import { getTracksFeatures, tryRemoveTrack } from 'playlist/playlistActions'
import IRootState from 'rootState'
import { resetStagedSuggestions } from 'requests/suggestionActions'
import EventPlaylist from './EventPlaylist'
import {
  moveItemInEventPlaylist,
  saveEventPlaylist,
  sortPlaylistByVotesDescending
} from 'event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
  notification: state.playlist.notification,
  saving: state.event.savingEventPlaylist,
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
