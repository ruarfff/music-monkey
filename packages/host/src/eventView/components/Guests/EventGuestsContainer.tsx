import { connect } from 'react-redux'
import IRootState from '../../../rootState'
import { copyEventInvite } from '../../eventViewActions'
import EventGuests from './EventGuests'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event
})

const mapDispatchToProps = {
  copyEventInvite
}

const EventGuestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventGuests)

export default EventGuestsContainer
