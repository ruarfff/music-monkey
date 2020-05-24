import React, { FC, useEffect } from 'react'
import { AppBar, Typography, Tab, Tabs } from '@material-ui/core'
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
  playlistsLoading: boolean
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
  playlistsLoading,
  fetchPlaylists,
  onTrackSelected,
  onPlaylistSelected,
  addLikedTracks
}) => {
  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  useEffect(() => {
    const getLikedTracks = async () => {
      try {
        const usersLikedTracks = await getUserVotesWithTracks()
        addLikedTracks(usersLikedTracks)
      } catch (err) {
        console.error(err)
      }
    }

    getLikedTracks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="PLAYLISTS" />
          <Tab label="LIKED SONGS" />
        </Tabs>
      </AppBar>

      <Typography component="div" dir="0" hidden={tabIndex !== 0}>
        <Playlists
          user={user}
          playlists={userPlaylists}
          playlistsEnabled={false}
          playlistsLoading={playlistsLoading}
          onTrackSelected={onTrackSelected}
          onPlaylistSelected={onPlaylistSelected}
          fetchPlaylists={fetchPlaylists}
        />
      </Typography>
      <Typography component="div" dir="1" hidden={tabIndex !== 1}>
        <TrackList
          tracks={isEmpty(likedTracks) ? [] : likedTracks.map((lt) => lt.track)}
          options={{ canRequest: true }}
          onSelected={onTrackSelected}
        />
      </Typography>
    </div>
  )
}
