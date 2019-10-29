import isEmpty from 'lodash/isEmpty'
import uploadImage from 'upload/uploadImage'
import IEvent from 'event/IEvent'
import { createPlaylist, addTracksToPlaylist } from 'playlist/playlistClient'
import { createEvent } from 'event/eventClient'
import SaveEventFormValues from './SaveEventFormValues'
import IPlaylist from 'playlist/IPlaylist'

const saveEventFlow = async (
  {
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
  }: SaveEventFormValues,
  isEditing: boolean
) => {
  let imageUrl = ''
  try {
    const uploadResponse = await uploadImage(image.name, image.data)
    imageUrl = uploadResponse.imgUrl
  } catch (err) {
    console.error(err)
  }

  const playlist: IPlaylist = await createPlaylist(eventName, eventDescription)

  if (!isEmpty(tracks)) {
    addTracksToPlaylist(playlist.id, tracks.map(track => track.uri))
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

  const savedEvent = await createEvent(eventDetails)

  return savedEvent
}

export default saveEventFlow
