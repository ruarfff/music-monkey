import IPlaylist from "../playlist/IPlaylist";

export default interface IEventPlaylistState {
  playlist: IPlaylist
  savingEventPlaylist: boolean
  saveEventPlaylistError?: Error
}
