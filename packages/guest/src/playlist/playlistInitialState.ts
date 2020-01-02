import { Playlist } from 'mm-shared'
import IPlaylistState from './IPlaylistState'

export default {
  data: {} as Playlist[],
  eventPlaylists: [],
  error: undefined,
  isLoading: false,
  offset: 50
} as IPlaylistState
