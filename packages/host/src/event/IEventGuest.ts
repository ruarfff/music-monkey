import IRsvp from 'rsvp/IRsvp'
import ISafeUser from 'user/ISafeUser'

export default interface IEventGuest {
  user: ISafeUser
  rsvp: IRsvp
}
