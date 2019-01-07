import moment from 'moment'
import client from 'music-monkey-client'
import IInvite from './IInvite'

export const getInviteById = async (inviteId: string): Promise<IInvite> => {
  const response = await client.get('/invites/' + inviteId, {
    withCredentials: true
  })
  const invite = response.data
  const { event } = invite
  return {
    ...invite,
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }
}
