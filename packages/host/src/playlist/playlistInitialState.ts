import ITrackWithFeatures from '../track/ITrackWithFeatures'
import IPlaylist from './IPlaylist'
import IPlaylistState from './IPlaylistState'
import ISearch from './ISearch'

export default {
  data: [] as IPlaylist[],
  error: {} as Error,
  isLoading: false,
  searchResult: {} as ISearch,
  selectedPlaylist: {} as IPlaylist,
  notification: '',
  tracksWithFeatures: [] as ITrackWithFeatures[]
} as IPlaylistState
