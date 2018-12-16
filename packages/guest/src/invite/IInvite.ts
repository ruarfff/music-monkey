import IEvent from '../event/IEvent'

export default interface IInvite {
  inviteId: string
  eventId: string
  event: IEvent
}
