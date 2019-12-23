import { connect } from 'react-redux'
import IRootState from 'rootState'
import EventPlaylistView from './EventPlaylistView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
  acceptedSuggestions: state.suggestion.acceptedSuggestions,
  stagedSuggestions: state.suggestion.stagedSuggestions,
  pendingSuggestions: state.suggestion.pendingSuggestions,
  playlist: state.eventPlaylist.playlist
})

const mapDispatchToProps = {}

const EventPlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPlaylistView)

export default EventPlaylistViewContainer
