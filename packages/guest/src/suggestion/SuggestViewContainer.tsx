import { connect } from 'react-redux'
import IRootState from '../rootState'
import { getSuggestions } from '../suggestion/suggestionActions'
import SuggestView from './SuggestView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent,
  suggestions: state.suggestion.suggestions
})

const mapDispatchToProps = {
  getSuggestions
}

const SuggestViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestView as any)

export default SuggestViewContainer
