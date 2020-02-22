import React, { FC, useEffect } from 'react'
import { AppBar, Typography, Tab, Tabs } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import SwipeableViews from 'react-swipeable-views'
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

    if (isEmpty(likedTracks)) {
      getLikedTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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

      <SwipeableViews axis="x" index={tabIndex} onChangeIndex={handleTabChange}>
        <Typography component="div" dir="0">
          <Playlists
            user={user}
            playlists={userPlaylists}
            playlistsEnabled={false}
            onTrackSelected={onTrackSelected}
            onPlaylistSelected={onPlaylistSelected}
          />
        </Typography>
        <Typography component="div" dir="0">
          <TrackList
            tracks={isEmpty(likedTracks) ? [] : likedTracks.map(lt => lt.track)}
            options={{ canRequest: true }}
            onSelected={onTrackSelected}
          />
        </Typography>
      </SwipeableViews>
    </div>
  )
}
