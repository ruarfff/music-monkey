import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { savePlaylistRequest, saveTrackRequest } from 'request/requestActions'
import Marvin from './Marvin'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event
})

const mapDispatchToProps = {
  saveTrackRequest,
  savePlaylistRequest
}

const MarvinContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Marvin)
)

export default MarvinContainer
