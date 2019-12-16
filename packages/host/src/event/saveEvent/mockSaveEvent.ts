import IEvent from 'event/IEvent'
import IPlaylist from 'playlist/IPlaylist'
import SaveEventFormValues from './SaveEventFormValues'

const mockSaveEvent = ({
  user,
  eventName,
  eventDescription,
  organizer,
  tracks = [],
  imageUrl,
  genre,
  location,
  settings,
  startDateTime,
  endDateTime
}: SaveEventFormValues) => {
  return {
    eventId: 'test',
    name: eventName,
    description: eventDescription,
    organizer,
    imageUrl,
    settings,
    startDateTime,
    endDateTime,
    location,
    genre,
    playlistUrl: '',
    playlist: {
      name: eventName,
      description: eventDescription,
      tracks: { items: tracks.map(track => ({ track })) }
    } as IPlaylist
  } as IEvent
}

export default mockSaveEvent
