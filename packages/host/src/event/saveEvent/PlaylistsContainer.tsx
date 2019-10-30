import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchPlaylists } from 'playlist/playlistActions'
import Playlists from './Playlists'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  playlists: state.playlist.data,
  playlistsLoading: state.playlist.isLoading
})

const mapDispatchToProps = { fetchPlaylists }

const PlaylistContainers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists)

export default PlaylistContainers
