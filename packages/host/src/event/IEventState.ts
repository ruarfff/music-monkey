import IEvent from './IEvent'
import IEventErrors from './IEventErrors'
import IPlaylistInput from './IPlaylistInput'

export default interface IEventState {
  errors: IEventErrors
  events: IEvent[]
  playlistInput: IPlaylistInput
  savingEvent: IEvent
  eventsLoading: boolean
  showSavedDialogue: boolean
  shareEventMessage: string
}
