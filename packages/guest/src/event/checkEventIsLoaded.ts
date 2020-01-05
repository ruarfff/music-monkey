import { Event } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'

const checkEventIsLoaded = (event: Event) =>
  !isEmpty(event) && !isEmpty(event.eventId)

export default checkEventIsLoaded
