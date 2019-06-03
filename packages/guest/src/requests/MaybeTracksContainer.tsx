import { connect } from 'react-redux'
import IRootState from '../rootState'
import MaybeTracks from './MaybeTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.userSuggestions,
  selectedEvent: state.event.selectedEvent
})

const mapDispatchToProps = {}

const MaybeTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaybeTracks)

export default MaybeTracksContainer
