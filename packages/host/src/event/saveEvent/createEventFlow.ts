import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import IEvent from 'event/IEvent'
import { createPlaylist, addTracksToPlaylist } from 'playlist/playlistClient'
import { createEvent, getEventById } from 'event/eventClient'
import IPlaylist from 'playlist/IPlaylist'
import CreateEventFormValues from './CreateEventFormValues'

const createEventFlow = async ({
  user,
  eventName,
  eventDescription,
  tracks
}: CreateEventFormValues) => {
  const playlist: IPlaylist = await createPlaylist(eventName, eventDescription)

  if (!isEmpty(tracks)) {
    addTracksToPlaylist(
      playlist.id,
      tracks!.map(track => track.uri)
    )
  }
  let eventDetails: IEvent = {
    userId: user.userId,
    organizer: user.displayName,
    name: eventName,
    description: eventDescription,
    playlist,
    playlistUrl: playlist.external_urls.spotify,
    startDateTime: moment()
      .utc()
      .add(2, 'hours')
      .startOf('hour'),
    endDateTime: moment()
      .utc()
      .add(3, 'hours')
      .startOf('hour')
  } as IEvent

  const savedEvent: IEvent = await createEvent(eventDetails)
  return await getEventById(savedEvent.eventId!)
}

export default createEventFlow
