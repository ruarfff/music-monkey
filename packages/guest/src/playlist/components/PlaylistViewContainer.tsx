import { connect } from 'react-redux'
import { selectPlaylist } from '../../navigation/activeActions'
import IRootState from '../../rootState'
import PlayListView from './PlaylistView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  eventPlaylists: state.playlist.eventPlaylists
})

const mapDispatchToProps = {
  selectPlaylist
}

const PlaylistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayListView)

export default PlaylistViewContainer
