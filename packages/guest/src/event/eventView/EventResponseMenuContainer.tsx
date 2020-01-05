import { connect } from 'react-redux'
import IRootState from 'rootState'
import { updateRsvp } from 'rsvp/rsvpActions'
import EventResponseMenu from './EventResponseMenu'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent
})

const mapDispatchToProps = {
  updateRsvp
}

const EventResponseMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventResponseMenu)

export default EventResponseMenuContainer
