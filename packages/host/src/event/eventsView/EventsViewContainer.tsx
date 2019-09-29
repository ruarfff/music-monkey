import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import EventsView from './EventsView'

const mapStateToProps = (state: IRootState) => ({
  events: state.event,
  user: state.user
})

const mapDispatchToProps = { getEvents }

const EventsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsView) as any)

export default EventsContainer
