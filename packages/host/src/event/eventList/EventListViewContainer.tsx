import { connect } from 'react-redux'
import IRootState from 'rootState'
import EventListView from './EventListView'
import { deselectEvent } from 'event/eventActions'

const mapStateToProps = ({ event }: IRootState) => ({
  event: event.event,
  events: event.events,
  eventsLoading: event.eventsLoading
})

const mapDispatchToProps = { deselectEvent }

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
