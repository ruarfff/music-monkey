import { connect } from 'react-redux'
import IRootState from '../rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEvent } from '../event/eventActions'
import { fetchEventVotes } from '../vote/voteActions'
import {
  getUsersSuggestions,
  getSuggestions
} from '../suggestion/suggestionActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  getEvent,
  fetchEventVotes,
  getUsersSuggestions,
  getSuggestions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionWrapper)
