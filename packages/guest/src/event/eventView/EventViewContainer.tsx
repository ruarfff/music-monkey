import { connect } from 'react-redux'
import IRootState from 'rootState'
import { setEventId } from 'event/eventActions'
import { createVote, deleteVote } from 'mm-shared'
import EventView from './EventView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event,
  votes: state.vote.votes,
  suggestions: state.suggestion.requests,
  pendingRequests: state.suggestion.pendingRequests
})

const mapDispatchToProps = {
  createVote,
  deleteVote,
  setEventId
}

const EventViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)

export default EventViewContainer
