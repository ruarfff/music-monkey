import { Playlist } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'

const getPlaylistDuration = (playlist: Playlist) => {
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

export default getPlaylistDuration
