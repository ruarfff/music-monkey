import isEmpty from 'lodash/isEmpty'
import IPlaylist from './IPlaylist'
import backgroundImg from 'assets/partycover.jpg'

const getPlaylistImage = (playlist: IPlaylist) => {
  return !isEmpty(playlist) && !isEmpty(playlist.images)
    ? playlist.images[0].url
    : backgroundImg
}

export default getPlaylistImage
