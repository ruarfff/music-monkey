import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'request/requestActions'
import { fetchEventVotes } from 'mm-shared'
import EventView from './EventView'
import { getEventById } from 'event/eventActions'

const mapStateToProps = ({ user, event, vote, suggestion }: IRootState) => ({
  isHost: true,
  user: user.data,
  error: event.fetchError,
  event: event.event,
  votes: vote.votes,
  suggestions: suggestion.requests,
  pendingRequests: suggestion.pendingRequests
})

const mapDispatchToProps = {
  getEventById,
  getEventSuggestions: getRequestsByEventId,
  fetchEventVotes
}

const EventViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)

export default EventViewContainer
