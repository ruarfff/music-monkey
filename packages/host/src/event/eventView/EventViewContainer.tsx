import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'request/requestActions'
import { fetchEventVotes } from 'mm-shared'
import EventView from './EventView'
import { getEventById, getEventByIdNoLoading } from 'event/eventActions'

const mapStateToProps = ({ event }: IRootState) => ({
  error: event.fetchError,
  event: event.event,
  loading: event.loading
})

const mapDispatchToProps = {
  getEventById,
  getEventSuggestions: getRequestsByEventId,
  fetchEventVotes,
  getEventByIdNoLoading
}

const EventViewContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventView)
)

export default EventViewContainer
