import { connect } from 'react-redux'
import IRootState from 'rootState'
import EventGuests from './EventGuests'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {}

const EventGuestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventGuests)

export default EventGuestsContainer
