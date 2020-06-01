import { Playlist, PageObject } from 'mm-shared'

export default interface IPlaylistState {
  data: PageObject<Playlist>
  error?: Error
  isLoading: boolean
}
