import http from '../http'
import IRsvp from './IRsvp'

export const fetchRsvpByInviteAndUser = (inviteId: string, userId: string) => {
  return http.get('/users/' + userId + '/rsvp?inviteId=' + inviteId, {
    withCredentials: true
  })
}

export const rsvpInvite = async (
  inviteId: string,
  userId: string,
  eventId: string
) => {
  const response = await http.post(
    '/rsvp',
    { inviteId, userId, eventId },
    {
      withCredentials: true
    }
  )
  return response.data
}

export const updateRsvp = (rsvp: IRsvp) => {
  return http.put('/rsvp/' + rsvp.rsvpId,
    { ...rsvp },
    { withCredentials: true }
  )
}