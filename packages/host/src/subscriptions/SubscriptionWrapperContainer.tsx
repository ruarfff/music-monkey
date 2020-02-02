import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEventByIdNoLoading } from 'event/eventActions'
import { fetchEventVotes } from 'mm-shared'
import { getRequestsByEventId } from 'request/requestActions'
import SubscriptionWrapper from './SubscriptionWrapper'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions: getRequestsByEventId
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionWrapper)
