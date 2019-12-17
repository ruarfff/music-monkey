import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import Requests from './Requests'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = { getEvents }

const RequestsContainer = connect(mapStateToProps, mapDispatchToProps)(Requests)

export default RequestsContainer
