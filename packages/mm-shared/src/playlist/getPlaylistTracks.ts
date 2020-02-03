import isEmpty from 'lodash/isEmpty'
import { Playlist } from 'mm-shared'
import { Track } from 'mm-shared'

export const getPlaylistTracks = (playlist: Playlist): Track[] => {
  if (
    isEmpty(playlist) ||
    isEmpty(playlist.tracks) ||
    isEmpty(playlist.tracks.items)
  ) {
    return []
  }
  return playlist.tracks.items.map(item => item.track)
}
