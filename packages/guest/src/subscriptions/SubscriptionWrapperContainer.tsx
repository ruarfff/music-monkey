import { connect } from 'react-redux'
import IRootState from '../rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEvent } from '../event/eventActions'
import { fetchEventVotes } from 'mm-shared'
import { getRequestsByEventId } from '../requests/suggestionActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  getEvent,
  fetchEventVotes,
  getEventSuggestions: getRequestsByEventId
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionWrapper)
