import { Event } from 'mm-shared'
import IEventErrors from './IEventErrors'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'

export default interface IEventState {
  errors: IEventErrors
  events: Event[]
  event: Event
  createEventStep: number
  eventsLoading: boolean
  showSavedDialogue: boolean
  shareEventMessage: string
  playlistReselected: boolean
  playlistInput: string
  savingEventPlaylist: boolean
  saveEventPlaylistError?: Error
  loading: boolean
  fetchError: Error
  copiedToClipboard: boolean
  pendingSuggestions: IDecoratedSuggestion[]
  rejectedSuggestions: IDecoratedSuggestion[]
}
