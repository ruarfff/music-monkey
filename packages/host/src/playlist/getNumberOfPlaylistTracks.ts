import isEmpty from 'lodash/isEmpty'
import { Playlist } from 'mm-shared'

const getNumberOfPlaylistTracks = (playlist: Playlist) => {
  if (
    isEmpty(playlist) ||
    isEmpty(playlist.tracks) ||
    isEmpty(playlist.tracks.items)
  ) {
    return 0
  }

  return playlist.tracks.items.length
}

export default getNumberOfPlaylistTracks
