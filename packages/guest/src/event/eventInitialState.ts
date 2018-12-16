import IEvent from './IEvent'
import IEventState from './IEventState'

export default {
  fetchEventError: undefined,
  selectedEvent: {} as IEvent,
  events: [],
  eventsLoading: false,
  eventLoading: false,
  selectedSuggestion: undefined
} as IEventState
