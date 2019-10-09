import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import EventsView from './EventsView'

const mapStateToProps = (state: IRootState) => ({
  eventsLoading: state.event.eventsLoading,
  events: state.event.events,
  user: state.user
})

const mapDispatchToProps = { getEvents }

const EventsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView) as any)

export default EventsContainer
