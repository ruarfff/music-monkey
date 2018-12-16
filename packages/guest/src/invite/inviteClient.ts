import moment from 'moment'
import client from 'music-monkey-client'
import IInvite from './IInvite'

export const getInviteById = (inviteId: string): Promise<IInvite> => {
  return client
    .get('/invites/' + inviteId, {
      withCredentials: true
    })
    .then(response => response.data)
    .then(invite => {
      const { event } = invite
      return {
        ...invite,
        ...event,
        endDateTime: moment(event.endDateTime),
        startDateTime: moment(event.startDateTime)
      }
    })
}
