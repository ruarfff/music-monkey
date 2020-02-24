import moment from 'moment'
import client from 'mm-client'
import { Event } from 'mm-shared'
import { Location } from 'mm-shared'

export const getEvents = async () => {
  const response = await client.get('/events', {
    withCredentials: true
  })
  return response.data.map((event: Event) => ({
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

export const createEvent = async (event: Event) => {
  const response = await client.post(
    '/events',
    {
      ...event,
      invites: undefined,
      location: getValidLocation(event.location),
      endDateTime: event.endDateTime.toISOString(),
      startDateTime: event.startDateTime.toISOString()
    },
    { withCredentials: true }
  )
  return parseEventResponse(response)
}

export const updateEvent = async (event: Event) => {
  const response = await client.put(
    '/events/' + event.eventId,
    { ...event, playlist: undefined },
    {
      withCredentials: true
    }
  )
  return parseEventResponse(response)
}

function getValidLocation(location: Location): Location {
  const address = location && location.address ? location.address : 'Nowhere'
  const latLng =
    location && location.latLng ? location.latLng : { lat: 0, lng: 0 }

  return { address, latLng }
}

function parseEventResponse(response: any) {
  return {
    ...response.data,
    endDateTime: moment(response.data.endDateTime),
    startDateTime: moment(response.data.startDateTime)
  }
}
