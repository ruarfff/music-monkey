import IEvent from './IEvent'
import IEventState from './IEventState'

export default {
  fetchEventError: undefined,
  selectedEvent: {} as IEvent,
  selectedSuggestion: undefined,
  events: [],
  eventsLoading: false,
  eventLoading: false,
  eventId: ''
} as IEventState
