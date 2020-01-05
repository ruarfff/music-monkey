import { Event } from 'mm-shared'
import IEventState from './IEventState'

export default {
  fetchEventError: undefined,
  event: {} as Event,
  selectedSuggestion: undefined,
  events: [],
  eventsLoading: false,
  eventLoading: false,
  eventId: ''
} as IEventState
