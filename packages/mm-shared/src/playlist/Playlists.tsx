import React, { FC, useState } from 'react'
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
import { ChevronRight, KeyboardArrowDown, QueueMusic } from '@material-ui/icons'
import isEmpty from 'lodash/isEmpty'
import Img from 'react-image'
import {
  Playlist,
  Track,
  TrackList,
  User,
  getFormattedPlaylistDuration,
  getNumberOfPlaylistTracks,
  getPlaylistImage
} from '..'
import backgroundImage from 'assets/music-monkey.jpg'
import './Playlists.scss'

interface PlaylistsProps {
  user: User
  playlists: Playlist[]
  playlistsEnabled: boolean
  onTrackSelected(track: Track): any
  onPlaylistSelected(suggestions: Playlist): any
}

const Playlists: FC<PlaylistsProps> = ({
  user,
  playlists = [],
  playlistsEnabled,
  onTrackSelected,
  onPlaylistSelected
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({} as Playlist)
  const handlePlaylistClicked = (playlist: Playlist) => () => {
    if (selectedPlaylist === playlist) {
      setSelectedPlaylist({} as Playlist)
    } else {
      setSelectedPlaylist(playlist)
    }
  }

  return (
    <List className="Playlists-root">
      {playlists
        .filter((playlist: Playlist) => playlist.tracks.total > 0)
        .map((playlist: Playlist, index: number) => (
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
              <div className="Playlists-tracks">
                <TrackList
                  tracks={playlist.tracks.items.map(t => t.track)}
                  onSelected={onTrackSelected}
                  options={{ canRequest: true }}
                />
              </div>
            </Collapse>
            <Divider variant="inset" component="li" />
          </Collapse>
        ))}
    </List>
  )
}

export default Playlists
