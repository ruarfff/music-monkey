import React, { useState, useEffect } from 'react'
import IAction from 'IAction'
import isEmpty from 'lodash/isEmpty'
import IUser from 'user/IUser'
import IPlaylist from 'playlist/IPlaylist'
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
import Image from 'components/Image'
import getPlaylistImage from 'playlist/getPlaylistImage'
import backgroundImg from 'assets/partycover.jpg'
import getFormattedPlaylistDuration from 'playlist/getFormattedPlaylistDuration'
import getNumberOfPlaylistTracks from 'playlist/getNumberOfPlaylistTracks'
import LoadingSpinner from 'loading/LoadingSpinner'

import './Playlists.scss'
import { onPlaylistSelected } from 'playlist/playlistActions'
import getTrackImage from 'track/getTrackImage'

interface PlaylistsProps {
  user: IUser
  playlists: IPlaylist[]
  playlistsLoading: boolean
  fetchPlaylists(user: IUser): IAction
}

const Playlists = ({
  user,
  playlists,
  playlistsLoading,
  fetchPlaylists
}: PlaylistsProps) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState()
  useEffect(() => {
    if (isEmpty(playlists) && !playlistsLoading) {
      fetchPlaylists(user)
    }
  }, [fetchPlaylists, playlists, playlistsLoading, user])

  const handlePlaylistClicked = (playlist: IPlaylist) => () => {
    if (selectedPlaylist === playlist) {
      setSelectedPlaylist(undefined)
    } else {
      setSelectedPlaylist(playlist)
    }
  }

  if (playlistsLoading) {
    return <LoadingSpinner />
  }

  return (
    <List className="Playlists-root">
      {playlists
        .filter((playlist: IPlaylist) => playlist.tracks.total > 0)
        .map((playlist: IPlaylist) => (
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
                <Image
                  alt={playlist.name}
                  src={getPlaylistImage(playlist)}
                  fallbackSrc={backgroundImg}
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
                  onClick={() => {
                    onPlaylistSelected(playlist)
                  }}
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
                      <ListItem
                        alignItems="flex-start"
                        className="Playlists-track"
                      >
                        <ListItemAvatar>
                          <Image
                            src={getTrackImage(track)}
                            alt={track.name}
                            fallbackSrc={backgroundImg}
                            className="Playlists-track-image"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          className="Playlists-track-content"
                          primary={track.name}
                          primaryTypographyProps={{ noWrap: true }}
                          secondary={track.album.artists[0].name}
                          secondaryTypographyProps={{
                            variant: 'body2',
                            noWrap: true
                          }}
                        />
                      </ListItem>
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
