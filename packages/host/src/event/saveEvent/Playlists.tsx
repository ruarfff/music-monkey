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
import { ChevronRight, KeyboardArrowDown, Queue } from '@material-ui/icons'
import Image from 'components/Image'
import getPlaylistImage from 'playlist/getPlaylistImage'
import backgroundImg from 'assets/partycover.jpg'
import getFormattedPlaylistDuration from 'playlist/getFormattedPlaylistDuration'
import getNumberOfPlaylistTracks from 'playlist/getNumberOfPlaylistTracks'
import LoadingSpinner from 'loading/LoadingSpinner'
import SearchResults from './SearchResults'
import ITrack from 'track/ITrack'

interface PlaylistsProps {
  user: IUser
  playlists: IPlaylist[]
  playlistsLoading: boolean
  filterList: ITrack[]
  fetchPlaylists(user: IUser): IAction
  onTrackSelected(track: ITrack): void
}

const Playlists = ({
  user,
  playlists,
  playlistsLoading,
  filterList,
  fetchPlaylists,
  onTrackSelected
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
    <List>
      {playlists
        .filter(
          (playlist: IPlaylist) =>
            playlist.tracks.total > 0 &&
            (isEmpty(selectedPlaylist) || playlist === selectedPlaylist)
        )
        .map((playlist: IPlaylist) => (
          <React.Fragment key={playlist.id}>
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
                <ListItem button>
                  <ListItemIcon>
                    <Queue />
                  </ListItemIcon>
                  <ListItemText primary="Add All" />
                </ListItem>
              </List>
              <SearchResults
                searchedTracks={playlist.tracks.items.map(item => item.track)}
                filterList={filterList}
                onTrackSelected={onTrackSelected}
              />
            </Collapse>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
    </List>
  )
}

export default Playlists
