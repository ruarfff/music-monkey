import IEvent from './IEvent'
import isEmpty from 'lodash/isEmpty'

const checkEventIsLoaded = (event: IEvent) =>
  !isEmpty(event) && !isEmpty(event.eventId)

export default checkEventIsLoaded
