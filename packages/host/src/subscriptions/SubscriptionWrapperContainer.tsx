import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEventByIdNoLoading } from 'event/eventActions'
import { fetchEventVotes } from 'mm-shared'
import { getEventSuggestions } from 'suggestion/suggestionActions'
import SubscriptionWrapper from './SubscriptionWrapper'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionWrapper)
