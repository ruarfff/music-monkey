import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchUsersEvents, getEvent } from 'event/eventActions'
import { getSuggestions } from 'suggestion/suggestionActions'
import { fetchEventVotes } from 'mm-shared'
import Content from './Content'

const mapStateToProps = ({ event }: IRootState) => ({
  events: event.events,
  eventsLoading: event.eventsLoading,
  selectedEvent: event.selectedEvent,
  eventId: event.eventId,
  eventLoading: event.eventLoading
})

const mapDispatchToProps = {
  getEvents: fetchUsersEvents,
  getEvent,
  getSuggestions,
  fetchEventVotes
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content)

export default ContentContainer
