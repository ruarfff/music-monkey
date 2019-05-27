import { connect } from 'react-redux'
import IRootState from '../../rootState'
import EventListView from './EventListView'
import {selectEvent} from '../eventActions'

const mapStateToProps = ({ event, user }: IRootState) => ({
  user: user.data,
  events: event.events,
  eventsLoading: event.eventsLoading,
  pastEvents: event.pastEvents,
  liveEvents: event.liveEvents,
  upcomingEvents: event.upcomingEvents
})

const mapDispatchToProps = {selectEvent}

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
