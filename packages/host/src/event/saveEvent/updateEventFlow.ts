import uploadImage from 'upload/uploadImage'
import IEvent from 'event/IEvent'
import { updateEvent } from 'event/eventClient'
import SaveEventFormValues from './SaveEventFormValues'

const updateEventFlow = async (
  event: IEvent,
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
  }: SaveEventFormValues
) => {
  let imageUrl = event.imageUrl
  if (imageUrl !== image.url) {
    try {
      const uploadResponse = await uploadImage(image.name, image.data)
      imageUrl = uploadResponse.imgUrl
    } catch (err) {
      console.error(err)
    }
  }

  const savedEvent = await updateEvent({ ...event, imageUrl })

  return savedEvent
}

export default updateEventFlow
