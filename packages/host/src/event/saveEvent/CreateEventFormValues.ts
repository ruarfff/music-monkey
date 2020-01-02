import IUser from 'user/IUser'
import { Track } from 'mm-shared'

export default interface CreateEventFormValues {
  user: IUser
  eventName: string
  eventDescription: string
  tracks?: Track[]
}
