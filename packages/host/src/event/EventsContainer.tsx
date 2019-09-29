import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getEvents } from './eventActions'
import Events from './Events'

const mapStateToProps = (state: IRootState) => ({
  events: state.event,
  user: state.user
})

const mapDispatchToProps = { getEvents }

const EventsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Events) as any)

export default EventsContainer
