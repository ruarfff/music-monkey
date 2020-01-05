import { Event } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'

export const checkEventIsLoaded = (event: Event) =>
  !isEmpty(event) && !isEmpty(event.eventId)
