import { Event } from 'mm-shared'
import ISelectedSuggestion from './ISelectedSuggestion'

export default interface IEventState {
  fetchEventError?: Error
  eventId: string
  selectedEvent: Event
  events: Event[]
  eventsLoading: boolean
  eventLoading: boolean
  selectedSuggestion?: ISelectedSuggestion
}
