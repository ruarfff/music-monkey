import IEvent from 'event/IEvent'

const cr = '/create-event'
const createEventPaths = [cr, cr + '/playlist', cr + '/tracks', cr + '/details']

const editEventPaths = (event: IEvent) => {
  const cr = `/events/${event.eventId}/edit`
  return [cr, cr + '/playlist', cr + '/tracks', cr + '/details']
}

const locationResolver = (event?: IEvent) => {
  return !!event ? editEventPaths(event) : createEventPaths
}

export default locationResolver
