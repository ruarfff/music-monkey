import IEvent from './IEvent'
import IEventErrors from './IEventErrors'

export default interface IEventState {
  errors: IEventErrors
  events: IEvent[]
  savingEvent: IEvent
  eventsLoading: boolean
}
