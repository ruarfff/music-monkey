import isEmpty from 'lodash/isEmpty'
import IPlaylist from './IPlaylist'
import { Track } from 'mm-shared'

const getPlaylistTracks = (playlist: IPlaylist): Track[] => {
  if (
    isEmpty(playlist) ||
    isEmpty(playlist.tracks) ||
    isEmpty(playlist.tracks.items)
  ) {
    return []
  }
  return playlist.tracks.items.map(item => item.track)
}

export default getPlaylistTracks
