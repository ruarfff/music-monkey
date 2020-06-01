import React, { FC, useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  ListItemIcon
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { QueueMusic } from '@material-ui/icons'
import isEmpty from 'lodash/isEmpty'
import Img from 'react-image'
import {
  Playlist,
  Track,
  TrackList,
  User,
  getFormattedPlaylistDuration,
  getNumberOfPlaylistTracks,
  getPlaylistImage,
  MarvinLoader,
  PageObject
} from '..'
import backgroundImage from 'assets/music-monkey.jpg'
import './Playlists.scss'

interface PlaylistsProps {
  user: User
  playlistsPage: PageObject<Playlist>
  playlistsEnabled: boolean
  playlistsLoading: boolean
  onTrackSelected(track: Track): any
  onPlaylistSelected(suggestions: Playlist): any
  fetchPlaylists(user: User, page: PageObject<Playlist>): any
}

const Playlists: FC<PlaylistsProps> = ({
  user,
  playlistsPage = {
    items: [],
    total: 0,
    limit: 30,
    offset: 0,
    href: '',
    next: '',
    previous: ''
  },
  playlistsEnabled,
  playlistsLoading,
  onTrackSelected,
  onPlaylistSelected,
  fetchPlaylists
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({} as Playlist)
  const handlePlaylistClicked = (playlist: Playlist) => () => {
    if (selectedPlaylist === playlist) {
      setSelectedPlaylist({} as Playlist)
    } else {
      setSelectedPlaylist(playlist)
    }
  }
  const withTracks = playlistsPage.items.filter(
    (playlist: Playlist) => playlist.tracks.total > 0
  )

  useEffect(() => {
    if (!playlistsLoading && !isEmpty(user) && isEmpty(playlistsPage.items)) {
      fetchPlaylists(user, playlistsPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (playlistsLoading) {
    return <MarvinLoader />
  }

  return (
    <List className="Playlists-root">
      <InfiniteScroll
        dataLength={withTracks.length}
        next={() => {
          if (!isEmpty(user) && !!playlistsPage.next) {
            console.log('Loading more!')
            const page = {
              ...playlistsPage,
              offset: playlistsPage.items.length
            }
            fetchPlaylists(user, page)
          }
        }}
        hasMore={!!playlistsPage.next}
        loader={<MarvinLoader />}
      >
        {withTracks.map((playlist: Playlist, index: number) => (
          <Collapse
            in={isEmpty(selectedPlaylist) || playlist === selectedPlaylist}
            key={playlist.id + '-' + index}
          >
            {playlistsEnabled && selectedPlaylist === playlist && (
              <List component="div" disablePadding>
                <ListItem
                  button
                  className="Playlists-select-playlist"
                  onClick={() => {
                    onPlaylistSelected(playlist)
                  }}
                >
                  <ListItemIcon>
                    <QueueMusic className="Playlists-select-playlist-icon" />
                  </ListItemIcon>
                  <ListItemText primary="Add all tracks" />
                </ListItem>
              </List>
            )}
            <ListItem
              alignItems="flex-start"
              button
              onClick={handlePlaylistClicked(playlist)}
            >
              <ListItemAvatar>
                <Img
                  alt={playlist.name}
                  src={[getPlaylistImage(playlist), backgroundImage]}
                  className="Playlists-image"
                />
              </ListItemAvatar>
              <ListItemText
                className="Playlists-item-text"
                primary={playlist.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {`${getNumberOfPlaylistTracks(playlist)} Tracks`}
                    </Typography>
                    {` —  ${getFormattedPlaylistDuration(playlist)}`}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction
                onClick={handlePlaylistClicked(playlist)}
              >
                <IconButton edge="end" aria-label="delete" color="primary">
                  {isEmpty(selectedPlaylist) && <ExpandMore />}
                  {selectedPlaylist === playlist && <ExpandLess />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              in={selectedPlaylist === playlist}
              timeout="auto"
              unmountOnExit
            >
              <div className="Playlists-tracks">
                <TrackList
                  tracks={playlist.tracks.items.map((t) => t.track)}
                  onSelected={onTrackSelected}
                  options={{ canRequest: true }}
                />
              </div>
            </Collapse>
            <Divider variant="inset" component="li" />
          </Collapse>
        ))}
      </InfiniteScroll>
    </List>
  )
}

export default Playlists
