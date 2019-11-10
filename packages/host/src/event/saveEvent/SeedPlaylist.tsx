import React, { useState, useEffect } from 'react'
import IAction from 'IAction'
import isEmpty from 'lodash/isEmpty'
import IUser from 'user/IUser'
import IPlaylist from 'playlist/IPlaylist'
import {
  Grid,
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
import marvin from 'assets/marvin.png'
import Image from 'components/Image'
import getPlaylistImage from 'playlist/getPlaylistImage'
import backgroundImg from 'assets/partycover.jpg'
import getFormattedPlaylistDuration from 'playlist/getFormattedPlaylistDuration'
import getNumberOfPlaylistTracks from 'playlist/getNumberOfPlaylistTracks'
import LoadingSpinner from 'loading/LoadingSpinner'
import getTrackImage from 'track/getTrackImage'

import './SeedPlaylist.scss'

interface PlaylistsProps {
  user: IUser
  playlists: IPlaylist[]
  playlistsLoading: boolean
  fetchPlaylists(user: IUser): IAction
  onPlaylistSelected(playlist: IPlaylist): void
}

const SeedPlaylist = ({
  user,
  playlists,
  playlistsLoading,
  fetchPlaylists,
  onPlaylistSelected
}: PlaylistsProps) => {
  const emptyPlaylist: IPlaylist = ({
    tracks: { items: [] }
  } as unknown) as IPlaylist
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
    return (
      <div className="SeedPlaylist-root">
        <div className="SeedPlaylist-loading-area">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <Grid container className="SeedPlaylist-root">
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Playlist
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List className="SeedPlaylist-root">
          <Collapse in={isEmpty(selectedPlaylist)}>
            <ListItem
              alignItems="flex-start"
              button
              onClick={() => {
                onPlaylistSelected(emptyPlaylist)
              }}
            >
              <ListItemAvatar>
                <Image
                  alt="New Playlist"
                  src={marvin}
                  fallbackSrc={marvin}
                  className="SeedPlaylist-image-marvin"
                />
              </ListItemAvatar>
              <ListItemText
                className="SeedPlaylist-item-text"
                primary="Empty Playlist"
                secondary="Add tracks later"
              />
              <ListItemSecondaryAction
                onClick={() => {
                  onPlaylistSelected(emptyPlaylist)
                }}
              >
                <IconButton edge="end" aria-label="delete" color="primary">
                  <ChevronRight />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Collapse>
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
                      className="SeedPlaylist-image"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className="SeedPlaylist-item-text"
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
                      className="SeedPlaylist-select-playlist"
                      onClick={() => {
                        onPlaylistSelected(playlist)
                      }}
                    >
                      <ListItemIcon>
                        <QueueMusicIcon className="SeedPlaylist-select-playlist-icon" />
                      </ListItemIcon>
                      <ListItemText
                        className="SeedPlaylist-select-playlist-text"
                        primary="Use this playlist"
                      />
                    </ListItem>
                  </List>
                  <List>
                    {playlist.tracks.items
                      .map(item => item.track)
                      .map(track => (
                        <React.Fragment key={track.id}>
                          <ListItem
                            alignItems="flex-start"
                            className="SeedPlaylist-track"
                          >
                            <ListItemAvatar>
                              <Image
                                src={getTrackImage(track)}
                                alt={track.name}
                                fallbackSrc={backgroundImg}
                                className="SeedPlaylist-track-image"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              className="SeedPlaylist-track-content"
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
      </Grid>
    </Grid>
  )
}

export default SeedPlaylist
