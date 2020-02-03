import isEmpty from 'lodash/isEmpty'
import { Playlist } from '..'

export const getPlaylistDuration = (playlist: Playlist) => {
  if (
    isEmpty(playlist) ||
    isEmpty(playlist.tracks) ||
    isEmpty(playlist.tracks.items)
  ) {
    return 0
  }
  return playlist.tracks.items
    .map(item => item.track.duration_ms)
    .reduce((acc, dur) => acc + dur)
}
