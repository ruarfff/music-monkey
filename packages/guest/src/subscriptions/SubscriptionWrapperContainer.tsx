import { connect } from 'react-redux'
import IRootState from '../rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEvent } from '../event/eventActions'
import { fetchEventVotes } from '../vote/voteActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  getEvent,
  fetchEventVotes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionWrapper)