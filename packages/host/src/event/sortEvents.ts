import moment from 'moment'
import { sortBy } from 'lodash'
import IEvent from './IEvent'

const sortEvents = (events: IEvent[]) => {
  const now = moment()
  return {
    pastEvents: sortBy(
      events.filter(event => now.isAfter(event.endDateTime)),
      'endDateTime'
    ).reverse(),
    liveEvents: sortBy(
      events.filter(
        event =>
          now.isAfter(event.startDateTime) && now.isBefore(event.endDateTime)
      ),
      'endDateTime'
    ).reverse(),
    upcomingEvents: sortBy(
      events.filter(event => now.isBefore(event.startDateTime)),
      'endDateTime'
    ).reverse()
  }
}

export default sortEvents
