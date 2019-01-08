import ITrackWithFeatures from '../track/ITrackWithFeatures'
import IPlaylist from './IPlaylist'
import ISearch from './ISearch'

export default interface IPlaylistState {
  data: IPlaylist[]
  selectedPlaylist: IPlaylist
  error?: Error
  isLoading: boolean
  isCreating: boolean
  searchResult: ISearch
  notification: string
  tracksWithFeatures: ITrackWithFeatures[]
}
