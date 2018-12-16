import * as React from 'react'
import IAction from '../../IAction'
import IUser from '../../user/IUser'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'
import PlaylistsSimpleList from './PlaylistsSimpleList'

interface IPlaylistViewProps {
  user: IUser
  eventPlaylists: IPlaylist[]
  selectPlaylist(playlist: IPlaylist): IAction
  onPlaylistSelected(playlist: IPlaylist): any
}

const onPlaylistSelected = () => ({} as IAction)

const PlaylistView = ({ eventPlaylists, selectPlaylist }: IPlaylistViewProps) => {
  return (
    <PlaylistsSimpleList
      playlists={eventPlaylists}
      attached={false}
      onPlaylistSelected={onPlaylistSelected}
      selectPlaylist={selectPlaylist}
    />
  )
}

export default PlaylistView
