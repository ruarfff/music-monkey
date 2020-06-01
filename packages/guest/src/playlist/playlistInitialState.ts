import { Playlist } from 'mm-shared'
import IPlaylistState from './IPlaylistState'

export default {
  data: [] as Playlist[],
  error: undefined,
  isLoading: false,
  offset: 50
} as IPlaylistState
