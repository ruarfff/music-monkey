import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEventById } from 'event/eventActions'
import { fetchEventVotes, SubscriptionWrapper } from 'mm-shared'
import { getRequestsByEventId } from 'request/requestActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  getEventById,
  fetchEventVotes,
  getEventSuggestions: getRequestsByEventId
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionWrapper)
