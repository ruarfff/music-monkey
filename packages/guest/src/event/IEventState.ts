import IEvent from './IEvent'
import ISelectedSuggestion from './ISelectedSuggestion'

export default interface IEventState {
  fetchEventError?: Error
  eventId: string
  selectedEvent: IEvent
  events: IEvent[]
  eventsLoading: boolean
  eventLoading: boolean
  selectedSuggestion?: ISelectedSuggestion
}
