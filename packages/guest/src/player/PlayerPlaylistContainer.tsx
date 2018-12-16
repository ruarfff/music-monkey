import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import { deselectTrack } from '../track/trackActions'
import PlayerPlaylist from './PlayerPlaylist'

const mapStateToProps = (state: IRootState) => ({
  playlist: state.playlist.selectedPlaylist,
  userPlaylists: state.playlist.eventPlaylists,
  selectedTrack: state.track.selectedTrack,
  votes: state.vote.votes
})

const mapDispatchToProps = {
  deselectTrack
}

const PlayerPlaylistContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerPlaylist)
)

export default PlayerPlaylistContainer
