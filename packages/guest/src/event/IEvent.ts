import { Moment } from 'moment'
import ILocation from '../location/ILocation'
import IPlaylist from '../playlist/IPlaylist'
import IUser from '../user/IUser'
import IEventGuest from './IEventGuest'
import IEventSettings from './IEventSettings'

export default interface IEvent {
  eventId: string
  description: string
  endDateTime: Moment
  eventCode?: string
  imageUrl: string
  location: ILocation
  name: string
  organizer: string
  playlistUrl: string
  playlist: IPlaylist
  startDateTime: any
  venue: string
  userId: string
  hostData: IUser
  genre: string
  invites: string[]
  guests: IEventGuest[]
  settings: IEventSettings
}
