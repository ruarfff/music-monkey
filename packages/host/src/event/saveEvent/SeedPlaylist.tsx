import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Playlist, PageObject } from 'mm-shared'
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
import {
  Action,
  User,
  MarvinLoader,
  getTrackImage,
  getPlaylistImage,
  getFormattedPlaylistDuration,
  getNumberOfPlaylistTracks
} from 'mm-shared'
import marvin from 'assets/marvin.png'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'

import './SeedPlaylist.scss'

interface PlaylistsProps {
  user: User
  playlistsPage: PageObject<Playlist>
  playlistsLoading: boolean
  fetchPlaylists(user: User, page: PageObject<Playlist>): Action
  onPlaylistSelected(playlist: Playlist): void
}

const SeedPlaylist = ({
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
  playlistsLoading,
  fetchPlaylists,
  onPlaylistSelected
}: PlaylistsProps) => {
  const emptyPlaylist: Playlist = ({
    tracks: { items: [] }
  } as unknown) as Playlist
  const [selectedPlaylist, setSelectedPlaylist] = useState()
  const withTracks = playlistsPage.items.filter(
    (playlist: Playlist) => playlist.tracks.total > 0
  )

  useEffect(() => {
    if (isEmpty(playlistsPage.items) && !playlistsLoading) {
      fetchPlaylists(user, playlistsPage)
    }
  }, [
    fetchPlaylists,
    playlistsLoading,
    playlistsPage,
    playlistsPage.items,
    user
  ])

  const handlePlaylistClicked = (playlist: Playlist) => () => {
    if (selectedPlaylist === playlist) {
      setSelectedPlaylist(undefined)
    } else {
      setSelectedPlaylist(playlist)
    }
  }

  return (
    <Grid container className="SeedPlaylist-root">
      <Grid item xs={12}>
        <Typography
          className="SeedPlaylist-title"
          variant="h6"
          align="center"
          gutterBottom
        >
          Select a playlist to start adding music!
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
                <Img
                  alt="New Playlist"
                  src={marvin}
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
          <InfiniteScroll
            dataLength={withTracks.length}
            next={() => {
              if (!isEmpty(user) && !!playlistsPage.next) {
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
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={handlePlaylistClicked(playlist)}
                >
                  <ListItemAvatar>
                    <Img
                      alt={playlist.name}
                      src={[getPlaylistImage(playlist), backgroundImage]}
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
                      .map((item) => item.track)
                      .map((track) => (
                        <React.Fragment key={track.id}>
                          <ListItem
                            alignItems="flex-start"
                            className="SeedPlaylist-track"
                          >
                            <ListItemAvatar>
                              <Img
                                src={[getTrackImage(track), backgroundImage]}
                                alt={track.name}
                                className="SeedPlaylist-track-image"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              className="SeedPlaylist-track-content"
                              primary={track.name}
                              primaryTypographyProps={{ noWrap: true }}
                              secondary={track.artists[0].name}
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
          </InfiniteScroll>
        </List>
      </Grid>
    </Grid>
  )
}

export default SeedPlaylist
