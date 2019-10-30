import IPlaylist from './IPlaylist'
import formatDuration from 'util/formatDuration'
import getPlaylistDuration from './getPlaylistDuration'

const getFormattedPlaylistDuration = (playlist: IPlaylist) => {
  return formatDuration(getPlaylistDuration(playlist))
}

export default getFormattedPlaylistDuration
