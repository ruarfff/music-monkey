import isEmpty from 'lodash/isEmpty'
import IPlaylist from './IPlaylist'
import ITrack from 'track/ITrack'

const getPlaylistTracks = (playlist: IPlaylist): ITrack[] => {
  console.log('playlist: ', playlist)
  if (
    isEmpty(playlist) ||
    isEmpty(playlist.tracks) ||
    isEmpty(playlist.tracks.items)
  ) {
    return []
  }
  return playlist.tracks.items.map(item => item.track)
}

export default getPlaylistTracks
