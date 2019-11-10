import ILocation from 'location/ILocation'
import IPlaylist from 'playlist/IPlaylist'
import IEventGuest from './IEventGuest'
import IEventSettings from './IEventSettings'
import { Moment } from 'moment'

export default interface IEvent {
  eventId?: string
  description: string
  endDateTime: Moment
  imageUrl: string
  genre: string
  location: ILocation
  name: string
  organizer: string
  playlistUrl: string
  playlist?: IPlaylist
  startDateTime: Moment
  venue?: string
  invites?: string[]
  guests?: IEventGuest[]
  settings: IEventSettings
  createdAt?: string
  updatedAt?: string
  userId?: string
}
