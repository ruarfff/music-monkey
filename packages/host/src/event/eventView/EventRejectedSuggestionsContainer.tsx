import { connect } from 'react-redux'
import { saveEventPlaylist } from 'event/eventActions'
import IRootState from 'rootState'
import { stageSuggestion } from 'requests/suggestionActions'
import EventRejectedSuggestions from './EventRejectedSuggestions'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.rejectedSuggestions,
  playlist: state.event.event.playlist!
})

const mapDispatchToProps = {
  stageSuggestion,
  saveEventPlaylist
}

const EventRejectedSuggestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRejectedSuggestions)

export default EventRejectedSuggestionsContainer
