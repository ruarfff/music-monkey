import { connect } from 'react-redux'
import IRootState from '../rootState'
import RejectedTracks from './RejectedTracks'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  suggestions: state.suggestion.suggestions
})

const mapDispatchToProps = {}

const RejectedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedTracks)

export default RejectedTracksContainer
