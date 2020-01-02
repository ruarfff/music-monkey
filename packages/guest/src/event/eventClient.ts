import moment from 'moment'
import client from 'mm-client'
import { Event } from 'mm-shared'

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

export const getUsersInvitedEvents = async () => {
  const response = await client.get('/users/invited/events', {
    withCredentials: true
  })
  return response.data.map((event: Event) => ({
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }))
}
