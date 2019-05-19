import { connect } from 'react-redux'
import IRootState from '../rootState'
import SubscriptionWrapper from './SubscriptionWrapper'
import { getEvent } from '../event/eventActions'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  getEvent
}

const SubscriptionWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionWrapper)

export default SubscriptionWrapperContainer
