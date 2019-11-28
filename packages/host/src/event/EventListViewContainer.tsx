import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEvents } from './eventActions'
import EventListView from './EventListView'

const mapStateToProps = ({ event }: IRootState) => ({
  events: event.events,
  eventsLoading: event.eventsLoading
})

const mapDispatchToProps = { getEvents }

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
