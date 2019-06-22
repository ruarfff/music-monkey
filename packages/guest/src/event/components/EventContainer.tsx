import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { setEventId } from '../eventActions'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import Event from './Event'

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
  fetchEventVotes,
  setEventId
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer
