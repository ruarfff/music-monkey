import IUser from 'user/IUser'
import { Track } from 'mm-shared'
import IEventSettings from 'event/IEventSettings'
import ILocation from 'location/ILocation'
import { Moment } from 'moment'

export default interface SaveEventFormValues {
  user: IUser
  eventName: string
  eventDescription: string
  organizer: string
  tracks?: Track[]
  imageUrl: string
  genre: string
  location: ILocation
  settings: IEventSettings
  startDateTime: Moment
  endDateTime: Moment
}
