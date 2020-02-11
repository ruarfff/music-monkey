import { connect } from 'react-redux'
import IRootState from 'rootState'
import { savePlaylistRequest, saveTrackRequest } from 'request/requestActions'
import MusicView from './MusicView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event
})

const mapDispatchToProps = {
  saveTrackRequest,
  savePlaylistRequest
}

const MusicViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicView)

export default MusicViewContainer
