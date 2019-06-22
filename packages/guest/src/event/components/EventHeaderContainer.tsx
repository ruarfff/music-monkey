import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { updateRsvp } from '../../rsvp/rsvpActions'
import EventHeader from './EventHeader'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  updateRsvp
}

const EventHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeader)

export default EventHeaderContainer
