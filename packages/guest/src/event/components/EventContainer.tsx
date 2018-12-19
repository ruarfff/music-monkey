import { connect } from 'react-redux'
import { clearInvite } from '../../invite/inviteActions'
import IRootState from '../../rootState'
import { fetchOrCreateRsvp, updateRsvp } from '../../rsvp/rsvpActions'
import { getEvent } from '../eventActions'
import Event from './Event'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  selectedEvent: state.event.selectedEvent,
  inviteId: state.invite.inviteId,
  inviteEvent: state.invite.event,
  eventsLoading: state.event.eventsLoading,
  eventLoading: state.event.eventLoading
})

const mapDispatchToProps = {
  getEvent,
  fetchOrCreateRsvp,
  clearInvite,
  updateRsvp
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer
