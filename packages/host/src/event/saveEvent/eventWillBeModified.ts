import IEvent from 'event/IEvent'
import SaveEventFormValues from './SaveEventFormValues'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

const eventWillBeModified = (
  event: IEvent,
  formValue: SaveEventFormValues
): boolean => {
  if (isEmpty(event)) return false
  const a = {
    name: event.name,
    description: event.description || '',
    organizer: event.organizer,
    genre: event.genre,
    address: event.location.address,
    settings: event.settings,
    imageUrl: event.imageUrl,
    start: event.startDateTime.toDate().getDate(),
    end: event.endDateTime.toDate().getDate()
  }

  const b = {
    name: formValue.eventName,
    description: formValue.eventDescription,
    organizer: formValue.organizer,
    genre: formValue.genre,
    address: formValue.location.address,
    settings: formValue.settings,
    imageUrl: formValue.imageUrl,
    start: formValue.startDateTime.toDate().getDate(),
    end: formValue.endDateTime.toDate().getDate()
  }

  return !isEqual(a, b)
}

export default eventWillBeModified
