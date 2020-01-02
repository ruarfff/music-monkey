import { Location } from '../location'
import { Playlist } from '../playlist'
import { User } from '../user'
import { EventGuest } from './EventGuest'
import { EventSettings } from './EventSettings'
import { Moment } from 'moment'

export interface Event {
  eventId?: string
  description: string
  endDateTime: Moment
  imageUrl: string
  genre: string
  location: Location
  name: string
  organizer: string
  playlistUrl: string
  playlist?: Playlist
  startDateTime: Moment
  venue?: string
  invites?: string[]
  guests?: EventGuest[]
  settings: EventSettings
  createdAt?: string
  updatedAt?: string
  userId?: string
  hostData: User
}
