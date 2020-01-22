import { connect } from 'react-redux'
import IRootState from 'rootState'
import { updateRsvp } from 'rsvp/rsvpActions'
import { deselectEvent } from '../eventActions'
import { EventHeader } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event
})

const mapDispatchToProps = {
  deselectEvent,
  updateRsvp
}

const EventHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeader)

export default EventHeaderContainer
