import { connect } from 'react-redux'
import { selectPlaylist } from '../../navigation/activeActions'
import IRootState from '../../rootState'
import { fetchPlaylists } from '../playlistActions'
import PlayListView from './PlaylistView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  eventPlaylists: state.playlist.eventPlaylists,
  events: state.event.events
})

const mapDispatchToProps = {
  selectPlaylist,
  fetchPlaylists
}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayListView)

export default PlaylistViewContainer
