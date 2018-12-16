import { connect } from 'react-redux'
import IRootState from '../../../rootState'
import {
  stageSuggestion
} from '../../../suggestion/suggestionActions'
import EventRejectedSuggestions from './EventRejectedSuggestions'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.rejectedSuggestions
})

const mapDispatchToProps = {
  stageSuggestion,
}

const EventRejectedSuggestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRejectedSuggestions)

export default EventRejectedSuggestionsContainer
