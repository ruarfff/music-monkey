import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Collapse,
  ListItemIcon
} from '@material-ui/core'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import { ChevronRight, KeyboardArrowDown } from '@material-ui/icons'
import Img from 'react-image'
import getPlaylistImage from 'playlist/getPlaylistImage'
import backgroundImage from 'assets/music-monkey.jpg'
import getFormattedPlaylistDuration from 'playlist/getFormattedPlaylistDuration'
import getNumberOfPlaylistTracks from 'playlist/getNumberOfPlaylistTracks'
import { Action, Track, LoadingSpinner, User, Playlist } from 'mm-shared'
import TrackItem from './TrackItem'

import './Playlists.scss'

interface PlaylistsProps {
  user: User
  playlists: Playlist[]
  playlistsLoading: boolean
  onAddTracks(tracks: Track[]): void
  fetchPlaylists(user: User): Action
}

const Playlists = ({
  user,
  playlists,
  playlistsLoading,
  fetchPlaylists,
  onAddTracks
}: PlaylistsProps) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState()
  useEffect(() => {
    if (isEmpty(playlists) && !playlistsLoading) {
      fetchPlaylists(user)
    }
  }, [fetchPlaylists, playlists, playlistsLoading, user])

  const handlePlaylistClicked = (playlist: Playlist) => () => {
    if (selectedPlaylist === playlist) {
      setSelectedPlaylist(undefined)
    } else {
      setSelectedPlaylist(playlist)
    }
  }

  const handlePlaylistTracksSelected = (playlist: Playlist) => () => {
    onAddTracks(playlist.tracks.items.map(item => item.track))
  }

  const handleTrackSelected = (track: Track) => () => {
    onAddTracks([track])
  }

  if (playlistsLoading) {
    return <LoadingSpinner />
  }

  return (
    <List className="Playlists-root">
      {playlists
        .filter((playlist: Playlist) => playlist.tracks.total > 0)
        .map((playlist: Playlist) => (
          <Collapse
            in={isEmpty(selectedPlaylist) || playlist === selectedPlaylist}
            key={playlist.id}
          >
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
                  {isEmpty(selectedPlaylist) && <ChevronRight />}
                  {selectedPlaylist === playlist && <KeyboardArrowDown />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              in={selectedPlaylist === playlist}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  className="Playlists-select-playlist"
                  onClick={handlePlaylistTracksSelected(playlist)}
                >
                  <ListItemIcon>
                    <QueueMusicIcon className="Playlists-select-playlist-icon" />
                  </ListItemIcon>
                  <ListItemText primary="Add all tracks" />
                </ListItem>
              </List>
              <List>
                {playlist.tracks.items
                  .map(item => item.track)
                  .map(track => (
                    <React.Fragment key={track.id}>
                      <TrackItem
                        track={track}
                        onSelected={handleTrackSelected(track)}
                      />
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
              </List>
            </Collapse>
            <Divider variant="inset" component="li" />
          </Collapse>
        ))}
    </List>
  )
}

export default Playlists
