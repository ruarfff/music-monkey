import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchPlaylists } from 'playlist/playlistActions'
import { Music } from 'mm-shared'
import { addLikedTracks } from './musicActions'

const mapStateToProps = (state: IRootState) => ({
  isHost: true,
  user: state.user.data,
  userPlaylists: state.playlist.data,
  likedTracks: state.music.likedTracks
})

const mapDispatchToProps = {
  fetchPlaylists,
  addLikedTracks
}

const MusicContainer = connect(mapStateToProps, mapDispatchToProps)(Music)

export default MusicContainer
