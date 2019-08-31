import { isEmpty } from 'lodash'
import IPlaylist from './IPlaylist'
import partyImg from '../assets/partycover.png'

export const numTracks = (playlist: IPlaylist) => {
  return !isEmpty(playlist) && playlist.tracks && playlist.tracks.items
    ? playlist.tracks.items.length
    : 0
}

export const durationSeconds = (playlist: IPlaylist) => {
  return numTracks(playlist) > 0
    ? playlist.tracks.items
        .map(item => item.track.duration_ms)
        .reduce((acc, dur) => acc + dur)
    : 0
}

export const img = (playlist: IPlaylist) => {
  return !isEmpty(playlist) && playlist.images[0]
    ? playlist.images[0].url
    : partyImg
}
