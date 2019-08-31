import { connect } from 'react-redux'
import IRootState from '../../../rootState'
import { copyEventInvite } from '../../eventViewActions'
import EventGuestsRightSideView from './EventGuestsRightSideView'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event
})

const mapDispatchToProps = {
  copyEventInvite
}

const EventGuestsRightSideViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventGuestsRightSideView)

export default EventGuestsRightSideViewContainer
