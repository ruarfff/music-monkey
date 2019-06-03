import IAlbum from '../playlist/IAlbum'
import IArtist from '../playlist/IArtist'

export default interface ITrack {
  disc_number: number
  duration_ms: number
  explicit: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  album: IAlbum
  artists: IArtist[]
  href: string
  id: string
}
