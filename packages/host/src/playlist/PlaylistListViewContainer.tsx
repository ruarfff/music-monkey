import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import EventListView from './PlaylistListView'

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
