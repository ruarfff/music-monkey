import { connect } from 'react-redux'
import { deselectEvent, setEventId } from '../event/eventActions'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent,
  fetchingSuggestions: state.suggestion.fetchingSuggestions
})

const mapDispatchToProps = {
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
