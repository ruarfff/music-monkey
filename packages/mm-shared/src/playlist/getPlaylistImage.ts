import isEmpty from 'lodash/isEmpty'
import { Playlist } from 'mm-shared'
import backgroundImage from 'assets/music-monkey.jpg'

export const getPlaylistImage = (playlist: Playlist) => {
  return !isEmpty(playlist) && !isEmpty(playlist.images)
    ? playlist.images[0].url
    : backgroundImage
}
