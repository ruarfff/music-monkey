import { Event } from 'mm-shared'

const cr = '/create-event'
const createEventPaths = [cr, cr + '/playlist', cr + '/tracks', cr + '/details']

const editEventPaths = (event: Event) => {
  const cr = `/events/${event.eventId}/edit`
  return [cr, cr + '/playlist', cr + '/tracks', cr + '/details']
}

const locationResolver = (event?: Event) => {
  return !!event ? editEventPaths(event) : createEventPaths
}

export default locationResolver
