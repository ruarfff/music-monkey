import React, { FC, useEffect } from 'react'
import { AppBar, Grid, Tab, Tabs } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import {
  Action,
  Track,
  User,
  useSwipeTabsIndex,
  Playlist,
  Playlists,
  getUserVotesWithTracks,
  TrackList
} from '../'

interface MusicProps {
  isHost: boolean
  user: User
  userPlaylists: Playlist[]
  likedTracks: { track: Track }[]
  fetchPlaylists(user: User): Action
  onTrackSelected(track: Track): any
  onPlaylistSelected(playlist: Playlist): any
  addLikedTracks(tracks: Track[]): any
}

export const Music: FC<MusicProps> = ({
  user,
  isHost,
  userPlaylists,
  likedTracks,
  fetchPlaylists,
  onTrackSelected,
  onPlaylistSelected,
  addLikedTracks
}) => {
  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  useEffect(() => {
    if (!isEmpty(user) && isEmpty(userPlaylists)) {
      fetchPlaylists(user)
    }

    const getLikedTracks = async () => {
      try {
        const usersLikedTracks = await getUserVotesWithTracks()
        addLikedTracks(usersLikedTracks)
      } catch (err) {
        console.error(err)
      }
    }

    console.log(likedTracks)
    if (isEmpty(likedTracks)) {
      getLikedTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Playlists" />
            <Tab label="Liked Songs" />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {tabIndex === 0 && (
          <Playlists
            user={user}
            playlists={userPlaylists}
            playlistsEnabled={false}
            onTrackSelected={onTrackSelected}
            onPlaylistSelected={onPlaylistSelected}
          />
        )}
        {tabIndex === 1 && (
          <TrackList tracks={likedTracks.map(lt => lt.track)} />
        )}
      </Grid>
    </Grid>
  )
}
