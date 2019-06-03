import { connect } from 'react-redux'
import IRootState from '../rootState'
import RejectedTracks from './RejectedTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.userSuggestions,
  selectedEvent: state.event.selectedEvent
})

const mapDispatchToProps = {}

const RejectedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedTracks)

export default RejectedTracksContainer
