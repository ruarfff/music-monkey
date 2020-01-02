import { Event } from 'mm-shared'

export default interface IInviteState {
  inviteId: string
  event: Event
  loading: boolean
  open: boolean
  error: any
}
