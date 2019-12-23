import IEvent from './IEvent'
import IEventErrors from './IEventErrors'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'

export default interface IEventState {
  errors: IEventErrors
  events: IEvent[]
  event: IEvent
  createEventStep: number
  eventsLoading: boolean
  showSavedDialogue: boolean
  shareEventMessage: string
  playlistReselected: boolean
  playlistInput: string
  loading: boolean
  fetchError: Error
  copiedToClipboard: boolean
  pendingSuggestions: IDecoratedSuggestion[]
  rejectedSuggestions: IDecoratedSuggestion[]
}
