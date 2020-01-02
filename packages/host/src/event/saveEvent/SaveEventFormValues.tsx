import { Track, User, Location, EventSettings } from 'mm-shared'
import { Moment } from 'moment'

export default interface SaveEventFormValues {
  user: User
  eventName: string
  eventDescription: string
  organizer: string
  tracks?: Track[]
  imageUrl: string
  genre: string
  location: Location
  settings: EventSettings
  startDateTime: Moment
  endDateTime: Moment
}
