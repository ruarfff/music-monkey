import { connect } from 'react-redux'
import IRootState from 'rootState'
import { clearMessage } from 'event/shareEvent/shareActions'
import { copyEventInvite } from 'event/eventActions'
import EventGuestsRightSideView from './EventGuestsRightSideView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event,
  message: state.event.shareEventMessage
})

const mapDispatchToProps = {
  copyEventInvite,
  clearMessage
}

const EventGuestsRightSideViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventGuestsRightSideView)

export default EventGuestsRightSideViewContainer
