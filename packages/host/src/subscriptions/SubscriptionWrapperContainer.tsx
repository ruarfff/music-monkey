import { connect } from 'react-redux'
import IRootState from '../rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEventByIdNoLoading } from '../event/eventView/eventViewActions'
import { fetchEventVotes } from '../vote/voteActions'
import { getEventSuggestions } from '../suggestion/suggestionActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.savingEvent
})

const mapDispatchToProps = {
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionWrapper)
