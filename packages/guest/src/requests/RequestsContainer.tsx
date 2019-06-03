import { connect } from 'react-redux'
import { deselectEvent, setEventId } from '../event/eventActions'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import {
  getSuggestions,
  getUsersSuggestions
} from '../suggestion/suggestionActions'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  event: state.event.selectedEvent,
  suggestion: state.suggestion,
  fetchingSuggestions: state.suggestion.fetchingSuggestions
})

const mapDispatchToProps = {
  getSuggestions,
  getUsersSuggestions,
  deselectEvent,
  setEventId
}

const RequestsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Requests)
)

export default RequestsContainer
