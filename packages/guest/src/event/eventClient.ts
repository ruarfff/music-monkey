import moment from 'moment'
import client from 'music-monkey-client'
import IEvent from './IEvent'

export const getEventById = async (eventId: string) => {
  const response = await client.get('/events/' + eventId, {
    withCredentials: true
  })
  const event = response.data
  return {
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }
}

export const getEventByInviteId = async (inviteId: string) => {
  const response = await client.get('/invites/' + inviteId + '/event', {
    withCredentials: true
  })
  const event = response.data
  return {
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }
}

export const getUsersInvitedEvents = async () => {
  const response = await client.get('/users/invited/events', {
    withCredentials: true
  })
  return response.data.map((event: IEvent) => ({
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }))
}
