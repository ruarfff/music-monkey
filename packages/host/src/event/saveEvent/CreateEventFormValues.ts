import { User, Track } from 'mm-shared'

export default interface CreateEventFormValues {
  user: User
  eventName: string
  eventDescription: string
  tracks?: Track[]
}
