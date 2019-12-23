import { connect } from 'react-redux'
import IRootState from 'rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEventByIdNoLoading } from '../event/eventActions'
import { fetchEventVotes } from 'vote/voteActions'
import { getEventSuggestions } from 'suggestion/suggestionActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionWrapper)
