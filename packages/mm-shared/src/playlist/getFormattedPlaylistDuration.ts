import { formatDuration, Playlist } from '..'
import { getPlaylistDuration } from './getPlaylistDuration'

export const getFormattedPlaylistDuration = (playlist: Playlist) => {
  return formatDuration(getPlaylistDuration(playlist))
}
