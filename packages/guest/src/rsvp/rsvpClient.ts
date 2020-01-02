import client from 'mm-client'
import { Rsvp } from 'mm-shared'

export const fetchRsvpByInviteAndUser = (inviteId: string, userId: string) => {
  return client.get('/users/' + userId + '/rsvp?inviteId=' + inviteId, {
    withCredentials: true
  })
}

export const rsvpInvite = async (
  inviteId: string,
  userId: string,
  eventId: string
) => {
  const response = await client.post(
    '/rsvp',
    { inviteId, userId, eventId },
    {
      withCredentials: true
    }
  )
  return response.data
}

export const updateRsvp = (rsvp: Rsvp) => {
  return client.put(
    '/rsvp/' + rsvp.rsvpId,
    { ...rsvp },
    { withCredentials: true }
  )
}
