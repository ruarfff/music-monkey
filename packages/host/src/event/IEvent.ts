import { Moment } from 'moment'
import ILocation from 'components/location/ILocation'
import IPlaylist from 'playlist/IPlaylist'
import IEventGuest from './IEventGuest'
import IEventSettings from './IEventSettings'

export default interface IEvent {
  eventId?: string
  description: string
  dataUrl: string
  endDateTime: Moment
  eventCode: string
  imageUrl: string
  genre: string
  location: ILocation
  name: string
  organizer: string
  playlistUrl: string
  playlist?: IPlaylist
  startDateTime: any
  venue?: string
  invites?: string[]
  guests: IEventGuest[]
  settings: IEventSettings
  createdAt?: string
  updatedAt?: string
  userId?: string
}
