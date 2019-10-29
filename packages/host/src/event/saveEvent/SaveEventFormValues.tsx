import IUser from 'user/IUser'
import ITrack from 'track/ITrack'
import IEventSettings from 'event/IEventSettings'
import ILocation from 'location/ILocation'
import { EventImage } from './SaveEvent'

export default interface SaveEventFormValues {
  user: IUser
  eventName: string
  eventDescription: string
  organizer: string
  tracks: ITrack[]
  image: EventImage
  genre: string
  location: ILocation
  settings: IEventSettings
  startDateTime: Date
  endDateTime: Date
}
