import { Playlist } from 'mm-shared'
import formatDuration from 'util/formatDuration'
import getPlaylistDuration from './getPlaylistDuration'

const getFormattedPlaylistDuration = (playlist: Playlist) => {
  return formatDuration(getPlaylistDuration(playlist))
}

export default getFormattedPlaylistDuration
