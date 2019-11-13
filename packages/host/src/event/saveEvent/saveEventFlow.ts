import isEmpty from 'lodash/isEmpty'
import uploadImage from 'upload/uploadImage'
import IEvent from 'event/IEvent'
import { createPlaylist, addTracksToPlaylist } from 'playlist/playlistClient'
import { createEvent, getEventById } from 'event/eventClient'
import IPlaylist from 'playlist/IPlaylist'
import SaveEventFormValues from './SaveEventFormValues'

const saveEventFlow = async ({
  user,
  eventName,
  eventDescription,
  organizer,
  tracks,
  image,
  genre,
  location,
  settings,
  startDateTime,
  endDateTime
}: SaveEventFormValues) => {
  let imageUrl = ''
  try {
    if (!!image && !!image.data) {
      const uploadResponse = await uploadImage(image.name, image.data)
      imageUrl = uploadResponse.imgUrl
    }
  } catch (err) {
    console.error(err)
  }

  const playlist: IPlaylist = await createPlaylist(eventName, eventDescription)

  if (!isEmpty(tracks)) {
    addTracksToPlaylist(
      playlist.id,
      tracks!.map(track => track.uri)
    )
  }
  let eventDetails: IEvent = {
    userId: user.userId,
    name: eventName,
    description: eventDescription,
    startDateTime,
    endDateTime,
    organizer,
    genre,
    location,
    settings,
    imageUrl,
    playlist,
    playlistUrl: playlist.external_urls.spotify
  }

  const savedEvent: IEvent = await createEvent(eventDetails)
  return await getEventById(savedEvent.eventId!)
}

export default saveEventFlow
