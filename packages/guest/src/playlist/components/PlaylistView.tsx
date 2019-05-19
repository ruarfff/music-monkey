import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import IUser from '../../user/IUser'
import IPlaylist from '../IPlaylist'
import './Playlist.scss'
import PlaylistsSimpleList from './PlaylistsSimpleList'
import React from 'react'

interface IPlaylistViewProps {
  user: IUser
  eventPlaylists: IPlaylist[]
  events: IEvent[]
  eventsLoading: boolean
  selectPlaylist(playlist: IPlaylist): IAction
  onPlaylistSelected(playlist: IPlaylist): any
}

const onPlaylistSelected = () => ({} as IAction)

const PlaylistView = ({
  eventPlaylists,
  events,
  user,
  eventsLoading,
  selectPlaylist
}: IPlaylistViewProps) => {
  return (
    <PlaylistsSimpleList
      events={events}
      playlists={eventPlaylists}
      eventsLoading={eventsLoading}
      attached={false}
      onPlaylistSelected={onPlaylistSelected}
      selectPlaylist={selectPlaylist}
    />
  )
}

export default React.memo(PlaylistView)
