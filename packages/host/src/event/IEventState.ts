import { Event, DecoratedSuggestion } from 'mm-shared'
import IEventErrors from './IEventErrors'

export default interface IEventState {
  errors: IEventErrors
  events: Event[]
  event: Event
  eventsLoading: boolean
  saveEventPlaylistError?: Error
  fetchError: Error
  pendingSuggestions: DecoratedSuggestion[]
  rejectedSuggestions: DecoratedSuggestion[]
}
