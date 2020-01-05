import { connect } from 'react-redux'
import { deselectEvent, selectEvent } from '../eventActions'
import IRootState from '../../rootState'
import EventPicker from './EventPicker'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  deselectEvent,
  selectEvent
}

const EventPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPicker)

export default EventPickerContainer
