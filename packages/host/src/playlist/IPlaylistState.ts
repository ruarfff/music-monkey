import ITrackWithFeatures from '../track/ITrackWithFeatures'
import { Playlist } from 'mm-shared'
import ISearch from './ISearch'

export default interface IPlaylistState {
  data: Playlist[]
  selectedPlaylist: Playlist
  error?: Error
  isLoading: boolean
  isCreating: boolean
  searchResult: ISearch
  notification: string
  tracksWithFeatures: ITrackWithFeatures[]
  createdPlaylists: Playlist[]
}
