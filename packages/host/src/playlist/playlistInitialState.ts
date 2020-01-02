import ITrackWithFeatures from '../track/ITrackWithFeatures'
import { Playlist } from 'mm-shared'
import IPlaylistState from './IPlaylistState'
import ISearch from './ISearch'

export default {
  data: [] as Playlist[],
  error: {} as Error,
  isLoading: false,
  isCreating: false,
  searchResult: {} as ISearch,
  selectedPlaylist: {} as Playlist,
  createdPlaylists: [] as Playlist[],
  notification: '',
  tracksWithFeatures: [] as ITrackWithFeatures[]
} as IPlaylistState
