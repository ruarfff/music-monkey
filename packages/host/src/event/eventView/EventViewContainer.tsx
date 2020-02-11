import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'request/requestActions'
import { fetchEventVotes } from 'mm-shared'
import EventView from './EventView'
import { getEventById, getEventByIdNoLoading } from 'event/eventActions'

const mapStateToProps = ({ event, vote, suggestion }: IRootState) => ({
  error: event.fetchError,
  event: event.event,
  loading: event.loading,
  votes: vote.votes,
  suggestions: suggestion.requests
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
