import { connect } from 'react-redux'
import IRootState from 'rootState'
import { selectEvent } from '../eventActions'
import { getEventSuggestions } from 'suggestion/suggestionActions'
import EventPicker from './EventPicker'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  selectedEvent: state.event.event
})

const mapDispatchToProps = { selectEvent, getEventSuggestions }

const EventPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPicker)

export default EventPickerContainer
