import IEvent from '../event/IEvent'

export default interface IInviteState {
  inviteId: string
  event: IEvent
  loading: boolean
  open: boolean
  error: any
}
