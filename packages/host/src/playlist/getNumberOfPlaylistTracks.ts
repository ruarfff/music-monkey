import isEmpty from 'lodash/isEmpty'
import IPlaylist from './IPlaylist'

const getNumberOfPlaylistTracks = (playlist: IPlaylist) => {
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
