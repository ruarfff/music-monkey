import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { selectEvent, getEventById } from 'event/eventActions'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'request/requestActions'
import { EventSelect } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  selectEvent,
  setEventId: getEventById,
  getRequestsByEventId
}

const EventSelectContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventSelect)
)

export default EventSelectContainer
