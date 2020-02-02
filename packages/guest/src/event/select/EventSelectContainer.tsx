import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { selectEvent, setEventId } from 'event/eventActions'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'requests/suggestionActions'
import { EventSelect } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  selectEvent,
  setEventId,
  getRequestsByEventId
}

const EventSelectContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventSelect)
)

export default EventSelectContainer
