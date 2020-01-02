import { Event } from 'mm-shared'

export default interface IInvite {
  inviteId: string
  eventId: string
  event: Event
}
