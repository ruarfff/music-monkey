import { connect } from 'react-redux'
import { saveEventPlaylist } from 'event/eventPlaylist/eventPlaylistActions'
import IRootState from 'rootState'
import {
  rejectSuggestion,
  stageAllSuggestions,
  stageSuggestion
} from 'suggestion/suggestionActions'
import EventSuggestions from './EventSuggestions'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.pendingSuggestions,
  playlist: state.eventPlaylist.playlist
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
