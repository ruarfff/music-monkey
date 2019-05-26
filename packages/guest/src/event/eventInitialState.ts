import IEvent from './IEvent'
import IEventState from './IEventState'

export default {
  fetchEventError: undefined,
  selectedEvent: {} as IEvent,
  events: [],
  upcomingEvents: [],
  liveEvents: [],
  pastEvents: [],
  eventsLoading: false,
  eventLoading: false,
  selectedSuggestion: undefined,
  eventId: ''
} as IEventState
