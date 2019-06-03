import IPlaylist from './IPlaylist'

export default interface IPlaylistState {
  data: IPlaylist[]
  eventPlaylists: IPlaylist[]
  error?: Error
  isLoading: boolean
  offset: number
}
