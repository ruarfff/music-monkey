import { connect } from 'react-redux'
import IRootState from '../../rootState'
import EventListView from './EventListView'
import { deselectEvent } from '../eventActions'

const mapStateToProps = ({ event, user }: IRootState) => ({
  selectedEvent: event.selectedEvent,
  events: event.events,
  eventsLoading: event.eventsLoading,
  pastEvents: event.pastEvents,
  liveEvents: event.liveEvents,
  upcomingEvents: event.upcomingEvents
})

const mapDispatchToProps = { deselectEvent }

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
