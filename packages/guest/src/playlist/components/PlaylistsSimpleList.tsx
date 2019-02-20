import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { isEmpty, sortBy, uniqBy } from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import IPlaylist from '../IPlaylist'

interface IPlaylistsSimpleListProps {
  playlists: IPlaylist[]
  events?: IEvent[]
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
    const { onPlaylistSelected, playlists, disableLinks, events } = this.props

    const handlePlaylistSelected = (playlist: IPlaylist) => () => {
      this.props.selectPlaylist(playlist)
      if (onPlaylistSelected) {
        onPlaylistSelected(playlist)
      }
    }

    const now = moment()

    let pastEvents, liveEvents, upcomingEvents, sortedPlaylists

    if (!isEmpty(events) && events && !disableLinks) {
      pastEvents = sortBy(
        events.filter(event => now.isAfter(event.endDateTime)),
        'endDateTime'
      ).reverse()

      liveEvents = sortBy(
        events
          .filter(
            event =>
              now.isAfter(event.startDateTime) && now.isBefore(event.endDateTime),
            'endDateTime'
          )
          .reverse()
      )

      upcomingEvents = sortBy(
        events
          .filter(event => now.isBefore(event.startDateTime), 'endDateTime')
          .reverse()
      )

      sortedPlaylists = uniqBy([...liveEvents, ...upcomingEvents, ...pastEvents].map(
        (event) => {
          return { ...event.playlist, eventId: event.eventId}
        }
      ), 'id')
    }

    const filteredPlaylists = sortedPlaylists ?
      sortedPlaylists.filter(
        playlist => playlist.tracks.items.length > 0
      ) : playlists && playlists.filter(
        playlist => playlist.tracks.items.length > 0
      )

    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    let playlistView = (
      <Typography align={'center'} variant={'h6'}>
        It looks like you don't have any playlists yet :(
      </Typography>
    )

    if (!isEmpty(filteredPlaylists)) {
      if (filteredPlaylists.length > 0) {
        playlistView = (
          <List>
            {filteredPlaylists.map((playlist: IPlaylist, i: number) => (
              <div className="playlist-list-item-wrapper" key={i}>
                <Link to={disableLinks ? '#' : '/playlist/' + playlist.eventId}>
                  <ListItem
                    disabled={playlist.tracks.total < 1}
                    button={true}
                    onClick={handlePlaylistSelected(playlist)}
                  >
                    <div className="playlist-list-item">
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
                  <Divider variant="inset" />
                </li>
              </div>
            ))}
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
