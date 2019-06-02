import { connect } from 'react-redux'
import { selectPlaylist } from '../../navigation/activeActions'
import IRootState from '../../rootState'
import PlaylistListView from './PlaylistListView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  eventPlaylists: state.playlist.eventPlaylists,
  events: state.event.events,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = {
  selectPlaylist
}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListView)

export default PlaylistViewContainer
