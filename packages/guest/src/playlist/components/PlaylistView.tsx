import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import IUser from '../../user/IUser'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'
import PlaylistsSimpleList from './PlaylistsSimpleList'

const React = require('react')
const { useEffect } = React

interface IPlaylistViewProps {
  user: IUser
  eventPlaylists: IPlaylist[]
  events: IEvent[]
  selectPlaylist(playlist: IPlaylist): IAction
  onPlaylistSelected(playlist: IPlaylist): any
  fetchPlaylists(user: IUser): IAction
}

const onPlaylistSelected = () => ({} as IAction)

const PlaylistView = ({
  eventPlaylists,
  events,
  user,
  selectPlaylist,
  fetchPlaylists
}: IPlaylistViewProps) => {
  useEffect(() => fetchPlaylists(user), [])

  return (
    <PlaylistsSimpleList
      events={events}
      playlists={eventPlaylists}
      attached={false}
      onPlaylistSelected={onPlaylistSelected}
      selectPlaylist={selectPlaylist}
    />
  )
}

export default PlaylistView
