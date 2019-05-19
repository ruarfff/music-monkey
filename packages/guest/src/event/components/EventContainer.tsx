import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { fetchOrCreateRsvp, updateRsvp } from '../../rsvp/rsvpActions'
import { createVote, deleteVote, fetchEventVotes } from '../../vote/voteActions'
import { getEvent } from '../eventActions'
import Event from './Event'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  votes: state.vote.votes,
  fetchingVotes: state.vote.fetchingVotes,
  selectedEvent: state.event.selectedEvent,
  inviteId: state.invite.inviteId,
  inviteEvent: state.invite.event,
  eventLoading: state.event.eventLoading,
  fetchingRsvp: state.rsvp.fetchingRsvp
})

const mapDispatchToProps = {
  getEvent,
  fetchOrCreateRsvp,
  updateRsvp,
  createVote,
  deleteVote,
  fetchEventVotes
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer
