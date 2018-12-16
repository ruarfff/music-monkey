import { connect } from 'react-redux'
import IRootState from '../rootState'
import AcceptedTracks from './AcceptedTracks'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.suggestions,
  selectedEvent: state.event.selectedEvent,
})

const mapDispatchToProps = {}

const AcceptedTracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptedTracks)

export default AcceptedTracksContainer
