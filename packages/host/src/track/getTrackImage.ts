import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import sortBy from 'lodash/sortBy'
import Image from 'image/Image'
import backgroundImage from 'assets/music-monkey.jpg'
import ITrack from './ITrack'

const getTrackImage = (track: ITrack) => {
  return track.album && !isEmpty(track.album.images)
    ? (head(sortBy(track.album.images, 'height')) || ({} as Image)).url
    : backgroundImage
}

export default getTrackImage
