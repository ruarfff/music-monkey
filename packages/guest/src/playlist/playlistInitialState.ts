import IPlaylist from './IPlaylist'
import IPlaylistState from './IPlaylistState'

export default {
  data: {} as IPlaylist[],
  eventPlaylists: [],
  error: undefined,
  isLoading: false,
  offset: 50
} as IPlaylistState
