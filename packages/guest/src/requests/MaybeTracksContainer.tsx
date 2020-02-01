import { connect } from 'react-redux'
import IRootState from 'rootState'
import MaybeTracks from './MaybeTracks'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  suggestions: state.suggestion.suggestions,
  event: state.event.event
})

const mapDispatchToProps = {}

const MaybeTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaybeTracks)

export default MaybeTracksContainer
