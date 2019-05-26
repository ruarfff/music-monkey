import { connect } from 'react-redux'
import IRootState from '../../rootState'
import EventListView from './EventListView'

const mapStateToProps = ({ event, user }: IRootState) => ({
  user: user.data,
  events: event.events,
  eventsLoading: event.eventsLoading,
  pastEvents: event.pastEvents,
  liveEvents: event.liveEvents,
  upcomingEvents: event.upcomingEvents
})

const mapDispatchToProps = {}

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
