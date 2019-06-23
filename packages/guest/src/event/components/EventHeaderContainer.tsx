import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { updateRsvp } from '../../rsvp/rsvpActions'
import { deselectEvent } from '../eventActions'
import EventHeader from './EventHeader'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  updateRsvp,
  deselectEvent
}

const EventHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeader)

export default EventHeaderContainer
