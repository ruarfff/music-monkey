import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'request/requestActions'
import { fetchEventVotes } from 'mm-shared'
import EventView from './EventView'
import { getEventById, getEventByIdNoLoading } from 'event/eventActions'
import { deselectEvent } from '../eventActions'

const mapStateToProps = ({ user, event, vote, suggestion }: IRootState) => ({
  isHost: true,
  user: user.data,
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
  getEventByIdNoLoading,
  deselectEvent
}

const EventViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)

export default EventViewContainer
