import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchPlaylists } from 'playlist/playlistActions'
import SeedPlaylist from './SeedPlaylist'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  playlists: state.playlist.data,
  playlistsLoading: state.playlist.isLoading
})

const mapDispatchToProps = { fetchPlaylists }

const SeedPlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedPlaylist)

export default SeedPlaylistContainer
