import { connect } from 'react-redux'
import IRootState from 'rootState'
import { setEventId } from 'event/eventActions'
import { createVote, deleteVote } from 'mm-shared'
import EventView from './EventView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  votes: state.vote.votes,
  fetchingVotes: state.vote.fetchingVotes,
  selectedEvent: state.event.selectedEvent,
  eventLoading: state.event.eventLoading
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
