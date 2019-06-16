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
import IPlaylist from '../IPlaylist'
import LoadingSpinner from '../../loading/LoadingSpinner'
import './PlaylistListView.scss'
interface IPlaylistListViewProps {
  playlists: IPlaylist[]
  events?: IEvent[]
  attached: boolean
  disableLinks?: boolean
  eventsLoading?: boolean
  addedPlaylist?(value: IPlaylist): any
}

class PlaylistListView extends React.Component<IPlaylistListViewProps> {
  public state = {
    anchorEl: null
  }

  public render() {
    const { playlists, disableLinks, events, eventsLoading } = this.props

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
              now.isAfter(event.startDateTime) &&
              now.isBefore(event.endDateTime),
            'endDateTime'
          )
          .reverse()
      )

      upcomingEvents = sortBy(
        events
          .filter(event => now.isBefore(event.startDateTime), 'endDateTime')
          .reverse()
      )

      sortedPlaylists = uniqBy(
        [...liveEvents, ...upcomingEvents, ...pastEvents].map(event => {
          return { ...event.playlist, eventId: event.eventId }
        }),
        'id'
      )
    }

    const filteredPlaylists = sortedPlaylists
      ? sortedPlaylists.filter(playlist => {
          if (!!playlist.tracks) {
            return playlist.tracks.items.length > 0
          }
          return false
        })
      : playlists &&
        playlists.filter(playlist => {
          if (!!playlist.tracks) {
            return playlist.tracks.items.length > 0
          }
          return false
        })

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
              <div className="PlaylistListView-item-wrapper" key={i}>
                <Link to={disableLinks ? '#' : '/playlist/' + playlist.eventId}>
                  <ListItem disabled={playlist.tracks.total < 1} button={true}>
                    <div className="PlaylistListView-item">
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

    return !eventsLoading ? playlistView : <LoadingSpinner />
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

export default PlaylistListView