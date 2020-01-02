import { Rsvp } from '../rsvp'
import { SafeUser } from '../user'

export interface EventGuest {
  user: SafeUser
  rsvp: Rsvp
}
