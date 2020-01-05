import { connect } from 'react-redux'
import IRootState from 'rootState'
import { saveEventPlaylist } from 'event/eventActions'
import {
  rejectSuggestion,
  stageAllSuggestions,
  stageSuggestion
} from 'requests/suggestionActions'
import EventSuggestions from './EventSuggestions'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.pendingSuggestions,
  playlist: state.event.event.playlist!
})

const mapDispatchToProps = {
  stageAllSuggestions,
  stageSuggestion,
  rejectSuggestion,
  saveEventPlaylist
}

const EventSuggestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSuggestions)

export default EventSuggestionContainer
