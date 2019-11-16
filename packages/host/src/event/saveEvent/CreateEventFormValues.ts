import IUser from 'user/IUser'
import ITrack from 'track/ITrack'
import IEventSettings from 'event/IEventSettings'

export default interface CreateEventFormValues {
  user: IUser
  eventName: string
  eventDescription: string
  tracks?: ITrack[]
  settings: IEventSettings
}
