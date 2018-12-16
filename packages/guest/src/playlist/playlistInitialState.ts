import IPlaylist from './IPlaylist'
import IPlaylistState from './IPlaylistState'

export default {
  data: {} as IPlaylist[],
  eventPlaylists: [],
  error: undefined,
  isLoading: false,
  selectedPlaylist: {} as IPlaylist
} as IPlaylistState
