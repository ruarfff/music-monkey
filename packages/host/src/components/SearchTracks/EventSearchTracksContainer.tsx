import { connect } from 'react-redux'
import {
  searchTrack,
  addTrack,
} from '../../playlist/playlistActions'
import IRootState from '../../rootState'
import EventSearchTracks from './EventSearchTracks'

const mapStateToProps = (state: IRootState) => ({
  searchResult: state.playlist.searchResult,
  // playlist: state.eventPlaylist.playlist,
  notification: state.playlist.notification
})

const mapDispatchToProps = {
  searchTrack,
  addTrack,
}

const EventSearchTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSearchTracks)

export default EventSearchTracksContainer
