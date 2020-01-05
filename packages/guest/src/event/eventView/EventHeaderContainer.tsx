import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { deselectEvent } from '../eventActions'
import EventHeader from './EventHeader'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {
  deselectEvent
}

const EventHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventHeader)

export default EventHeaderContainer
