import * as React from 'react'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import IUser from '../../user/IUser'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'
import PlaylistsSimpleList from './PlaylistsSimpleList'

interface IPlaylistViewProps {
  user: IUser
  eventPlaylists: IPlaylist[]
  events: IEvent[]
  selectPlaylist(playlist: IPlaylist): IAction
  onPlaylistSelected(playlist: IPlaylist): any
}

const onPlaylistSelected = () => ({} as IAction)

const PlaylistView = ({ eventPlaylists, events, selectPlaylist }: IPlaylistViewProps) => {
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
