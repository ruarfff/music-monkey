import { connect } from 'react-redux'
import IRootState from 'rootState'
import { clearMessage } from 'event/shareEvent/shareActions'
import { copyEventInvite } from 'event/eventView/eventViewActions'
import EventGuestsRightSideView from './EventGuestsRightSideView'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event,
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
