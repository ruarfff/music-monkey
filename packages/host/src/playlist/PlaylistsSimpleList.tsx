import React from 'react'
import Avatar from '@material-ui/core/Avatar/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import IUser from '../user/IUser'
import IPlaylist from './IPlaylist'
import getPlaylistImage from './getPlaylistImage'

interface IPlaylistsSimpleListProps {
  playlists: IPlaylist[]
  user?: IUser
  disableEmptyPlaylists?: boolean
  onPlaylistSelected(playlist: IPlaylist): void
}

export default class PlaylistsSimpleList extends React.PureComponent<
  IPlaylistsSimpleListProps
> {
  public render() {
    const {
      onPlaylistSelected,
      user,
      playlists,
      disableEmptyPlaylists
    } = this.props
    const spotifyId = user ? user.spotifyId : ''
    const handlePlaylistSelected = (playlist: IPlaylist) => () =>
      onPlaylistSelected(playlist)

    let playlistView = <p>You do not have any playlists yet</p>

    if (playlists && playlists.length > 0) {
      playlistView = (
        <List>
          {playlists
            .filter((playlist: IPlaylist) => playlist.owner.id === spotifyId)
            .map((playlist: IPlaylist, i: number) => (
              <ListItem
                disabled={disableEmptyPlaylists && playlist.tracks.total < 1}
                key={i}
                button={true}
                onClick={handlePlaylistSelected(playlist)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={playlist.name}
                    src={getPlaylistImage(playlist)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={playlist.name}
                  secondary={`${playlist.tracks.total} tracks`}
                />
              </ListItem>
            ))}
        </List>
      )
    }

    return <div className="Playlist-list">{playlistView}</div>
  }
}
