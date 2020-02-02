import { connect } from 'react-redux'
import IRootState from '../rootState'
import AcceptedTracks from './AcceptedTracks'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  suggestions: state.suggestion.requests
})

const mapDispatchToProps = {}

const AcceptedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedTracks)

export default AcceptedTracksContainer
