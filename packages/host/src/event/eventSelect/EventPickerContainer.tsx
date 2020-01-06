import { connect } from 'react-redux'
import IRootState from 'rootState'
import { selectEvent } from '../eventActions'
import { getEventSuggestions } from 'requests/suggestionActions'
import EventPicker from './EventPicker'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = { selectEvent, getEventSuggestions }

const EventPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPicker)

export default EventPickerContainer