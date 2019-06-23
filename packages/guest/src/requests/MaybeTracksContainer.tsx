import { connect } from 'react-redux'
import IRootState from '../rootState'
import MaybeTracks from './MaybeTracks'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  suggestions: state.suggestion.suggestions,
  selectedEvent: state.event.selectedEvent
})

const mapDispatchToProps = {}

const MaybeTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaybeTracks)

export default MaybeTracksContainer
