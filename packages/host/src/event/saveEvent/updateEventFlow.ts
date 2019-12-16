import IEvent from 'event/IEvent'
import { updateEvent } from 'event/eventClient'
import SaveEventFormValues from './SaveEventFormValues'

const updateEventFlow = async (
  event: IEvent,
  {
    user,
    tracks,
    eventName,
    eventDescription,
    organizer,
    imageUrl,
    genre,
    location,
    settings,
    startDateTime,
    endDateTime
  }: SaveEventFormValues
) => {
  const cachedPlaylist = event.playlist
  const savedEvent = await updateEvent({
    ...event,
    imageUrl,
    location,
    genre,
    settings,
    startDateTime,
    endDateTime,
    organizer,
    description: eventDescription,
    name: eventName,
    playlist: undefined
  })

  return { ...savedEvent, playlist: cachedPlaylist }
}

export default updateEventFlow
