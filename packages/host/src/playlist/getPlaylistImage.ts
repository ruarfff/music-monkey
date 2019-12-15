import isEmpty from 'lodash/isEmpty'
import IPlaylist from './IPlaylist'
import backgroundImage from 'assets/music-monkey.jpg'

const getPlaylistImage = (playlist: IPlaylist) => {
  return !isEmpty(playlist) && !isEmpty(playlist.images)
    ? playlist.images[0].url
    : backgroundImage
}

export default getPlaylistImage
