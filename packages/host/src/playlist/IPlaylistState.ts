import { Playlist } from 'mm-shared'

export default interface IPlaylistState {
  data: Playlist[]
  error?: Error
  isLoading: boolean
  offset: number
}
