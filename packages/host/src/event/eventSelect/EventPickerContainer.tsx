import { connect } from 'react-redux'
import IRootState from 'rootState'
import { selectEvent } from '../eventActions'
import { getRequestsByEventId } from 'requests/requestActions'
import EventPicker from './EventPicker'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  selectEvent,
  getEventSuggestions: getRequestsByEventId
}

const EventPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPicker)

export default EventPickerContainer
