import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getEventSuggestions } from 'suggestion/suggestionActions'
import { fetchEventVotes } from 'vote/voteActions'
import EventView from './EventView'
import {
  acknowledgeEventInviteCopied,
  copyEventInvite,
  getEventById,
  getEventByIdNoLoading
} from 'event/eventActions'

const mapStateToProps = ({ event }: IRootState) => ({
  error: event.fetchError,
  event: event.event,
  loading: event.loading,
  copiedToClipboard: event.copiedToClipboard
})

const mapDispatchToProps = {
  getEventById,
  copyEventInvite,
  acknowledgeEventInviteCopied,
  getEventSuggestions,
  fetchEventVotes,
  getEventByIdNoLoading
}

const EventViewContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventView)
)

export default EventViewContainer
