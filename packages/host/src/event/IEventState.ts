import IEvent from './IEvent'
import IEventErrors from './IEventErrors'

export default interface IEventState {
  errors: IEventErrors
  events: IEvent[]
  savingEvent: IEvent
  createEventStep: number
  eventsLoading: boolean
  showSavedDialogue: boolean
  shareEventMessage: string
  playlistReselected: boolean
  playlistInput: string
}
