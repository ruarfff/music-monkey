import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'
import { isEmpty } from 'lodash'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as React from 'react'
import IAction from '../../IAction'
import IPlaylist from '../IPlaylist'
import { Link } from 'react-router-dom'

interface IPlaylistsSimpleListProps {
  playlists: IPlaylist[]
  attached: boolean
  disableLinks?: boolean
  selectPlaylist(playlist: IPlaylist): IAction
  addedPlaylist?(value: IPlaylist): any
  onPlaylistSelected?(playlist: IPlaylist): any
}

class PlaylistsSimpleList extends React.Component<IPlaylistsSimpleListProps> {
  public state = {
    anchorEl: null
  }

  public render() {
    const { onPlaylistSelected, playlists, disableLinks } = this.props

    const handlePlaylistSelected = (playlist: IPlaylist) => () => {
      this.props.selectPlaylist(playlist)
      if(onPlaylistSelected) {
        onPlaylistSelected(playlist)
      }
    }

    const filteredPlaylists = playlists.filter((playlist) => playlist.tracks.items.length > 0)

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    let playlistView = <p>You do not have any playlists yet</p>
    if (!isEmpty(filteredPlaylists)) {
      if (filteredPlaylists.length > 0) {
        playlistView = (
          <List>
            {filteredPlaylists.map((playlist: IPlaylist, i: number) => (
              <div className="playlist-list-item-wrapper" key={i}>
                <Link to={disableLinks ? '#' : ('/playlist/' + playlist.eventId) }>
                  <ListItem
                    disabled={playlist.tracks.total < 1}
                    button={true}
                    onClick={handlePlaylistSelected(playlist)}
                  >
                    <div
                      className="playlist-list-item"
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={playlist.name}
                          src={
                            playlist.images.length > 0
                              ? playlist.images[0].url
                              : '/img/partycover-sm.png'
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={playlist.name}
                        secondary={`${playlist.tracks.total} tracks`}
                      />
                    </div>
                    {!!this.props.addedPlaylist ? (
                      <div>
                        <IconButton
                          aria-label="More"
                          aria-owns={open ? 'long-menu' : ''}
                          aria-haspopup="true"
                          onClick={this.handleClick}
                          className="playList-button-menu"
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.handleAddAll(playlist)}>
                            {'Add All Requests to a Event Playlist'}
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      ''
                    )}
                  </ListItem>
                </Link>
                <li>
                  <Divider inset={true} />
                </li>
              </div>
            ))}
            <div className="stoper-block" />
          </List>
        )
      }
    }

    return playlistView
  }

  private handleAddAll = (playlist: IPlaylist) => () => {
    if (this.props.addedPlaylist) {
      this.props.addedPlaylist(playlist)
    }
    this.handleClose()
  }

  private handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }
}

export default PlaylistsSimpleList
