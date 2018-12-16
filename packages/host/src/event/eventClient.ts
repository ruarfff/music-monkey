import moment from 'moment'
import client from 'music-monkey-client'
import IEvent from './IEvent'

export const getEvents = async () => {
  const response = await client.get('/events', {
    withCredentials: true
  })
  return response.data.map((event: IEvent) => ({
    ...event,
    endDateTime: moment(event.endDateTime),
    startDateTime: moment(event.startDateTime)
  }))
}

export const getEventById = async (eventId: string) => {
  const response = await client.get('/events/' + eventId, {
    withCredentials: true
  })
  return parseEventResponse(response)
}

export const deleteEvent = (eventId: string) => {
  return client.delete('/events/' + eventId, {
    withCredentials: true
  })
}

export const createEvent = async (event: IEvent) => {
  const address =
    event.location && event.location.address
      ? event.location.address
      : 'Nowhere'
  const response = await client.post(
    '/events',
    {
      ...event,
      invites: undefined,
      endDateTime: event.endDateTime.toISOString(),
      location: {
        ...event.location,
        address
      },
      startDateTime: event.startDateTime.toISOString()
    },
    { withCredentials: true }
  )
  return parseEventResponse(response)
}

export const updateEvent = async (event: IEvent) => {
  const response = await client.put('/events/' + event.eventId, event, {
    withCredentials: true
  })
  return parseEventResponse(response)
}

function parseEventResponse(response: any) {
  return {
    ...response.data,
    endDateTime: moment(response.data.endDateTime),
    startDateTime: moment(response.data.startDateTime)
  }
}
