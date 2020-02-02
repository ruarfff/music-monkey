import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { Event, Playlist } from 'mm-shared'
import { createPlaylist, addTracksToPlaylist } from 'playlist/playlistClient'
import { createEvent, getEventById } from 'event/eventClient'
import CreateEventFormValues from './CreateEventFormValues'

const createEventFlow = async ({
  user,
  eventName,
  eventDescription,
  tracks
}: CreateEventFormValues) => {
  const playlist: Playlist = await createPlaylist(eventName, eventDescription)

  if (!isEmpty(tracks)) {
    addTracksToPlaylist(
      playlist.id,
      tracks!.map(track => track.uri)
    )
  }
  let eventDetails: Event = {
    userId: user.userId,
    organizer: user.displayName,
    name: eventName,
    description: eventDescription,
    playlist,
    playlistUrl: playlist.external_urls.spotify,
    settings: {
      dynamicVotingEnabled: false,
      autoAcceptSuggestionsEnabled: false,
      suggestingPlaylistsEnabled: false
    },
    startDateTime: moment()
      .utc()
      .add(2, 'hours')
      .startOf('hour'),
    endDateTime: moment()
      .utc()
      .add(3, 'hours')
      .startOf('hour')
  } as Event

  const savedEvent: Event = await createEvent(eventDetails)
  return await getEventById(savedEvent.eventId!)
}

export default createEventFlow
