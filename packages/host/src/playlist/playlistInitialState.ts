import { Playlist } from 'mm-shared'
import IPlaylistState from './IPlaylistState'

export default {
  data: [] as Playlist[],
  error: {} as Error,
  isLoading: false
} as IPlaylistState
