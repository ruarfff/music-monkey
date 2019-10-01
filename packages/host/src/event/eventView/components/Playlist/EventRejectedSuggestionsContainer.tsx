import { connect } from 'react-redux'
import { saveEventPlaylist } from 'event/eventPlaylist/eventPlaylistActions'
import IRootState from 'rootState'
import { stageSuggestion } from 'suggestion/suggestionActions'
import EventRejectedSuggestions from './EventRejectedSuggestions'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.rejectedSuggestions,
  playlist: state.eventPlaylist.playlist
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