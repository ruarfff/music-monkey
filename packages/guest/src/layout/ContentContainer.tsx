import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchUsersEvents, getEventById } from 'event/eventActions'
import { getRequestsByEventId } from 'request/requestActions'
import { fetchEventVotes } from 'mm-shared'
import Content from './Content'

const mapStateToProps = ({ event }: IRootState) => ({
  events: event.events,
  eventsLoading: event.eventsLoading,
  event: event.event,
  eventId: event.eventId,
  eventLoading: event.eventLoading
})

const mapDispatchToProps = {
  getEvents: fetchUsersEvents,
  getEventById,
  getEventSuggestions: getRequestsByEventId,
  fetchEventVotes
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content)

export default ContentContainer
