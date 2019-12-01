import IUser from 'user/IUser'
import ITrack from 'track/ITrack'

export default interface CreateEventFormValues {
  user: IUser
  eventName: string
  eventDescription: string
  tracks?: ITrack[]
}
