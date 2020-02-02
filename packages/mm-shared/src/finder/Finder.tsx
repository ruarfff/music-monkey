import React, { FC, useEffect, useState } from 'react'
import { Grid, Tab, Tabs, Typography, Badge, Paper } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import {
  Action,
  Event,
  Track,
  User,
  LoadingSpinner,
  TrackSearch,
  useSwipeTabsIndex,
  TrackList,
  Playlist
} from '../'
import Playlists from './Playlists'

import './Finder.scss'

interface FinderProps {
  user: User
  event: Event
  events: Event[]
  userPlaylists: Playlist[]
  recommendations: Track[]
  getRecommendations(): Action
  fetchPlaylists(user: User): Action
  onTrackSelected?(track: Track): any
  onPlaylistSelected?(playlist: Playlist): any
  onPlaylistTracksChanged?(tracks: Track[]): any
}

const Finder: FC<FinderProps> = ({
  user,
  event,
  events,
  userPlaylists,
  recommendations = [],
  getRecommendations,
  fetchPlaylists,
  onTrackSelected = () => {},
  onPlaylistSelected = () => {},
  onPlaylistTracksChanged = () => {}
}) => {
  useEffect(() => {
    if (!isEmpty(user) && isEmpty(userPlaylists)) {
      fetchPlaylists(user)
    }

    if (isEmpty(recommendations)) {
      getRecommendations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const [tabIndex, handleTabChange] = useSwipeTabsIndex()
  const [searchResults, setSearchResults] = useState()
  const [searching, setSearching] = useState()

  if (isEmpty(events)) {
    return (
      <Typography align={'center'} variant={'h6'}>
        You don't have any events yet.
      </Typography>
    )
  }

  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track)
      : []

  return (
    <Grid container className="Finder-root" spacing={2}>
      <Grid item xs={12}>
        <TrackSearch
          onSearchResult={(results: Track[]) => {
            if (!isEqual(searchResults, results))
              setSearchResults(
                results.filter(
                  searchedTrack =>
                    playlistTracks
                      .map(t => t.uri)
                      .indexOf(searchedTrack.uri) === -1
                )
              )
            setSearching(false)
          }}
          onSearchStart={() => {
            setSearching(true)
          }}
          onFocus={() => {
            handleTabChange(1)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            className="Finder-tab"
            label={
              !isEmpty(playlistTracks) ? (
                <Badge
                  className="Finder-playlist-count"
                  overlap="circle"
                  color={'secondary'}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  badgeContent={playlistTracks.length}
                >
                  Current Playlist
                </Badge>
              ) : (
                'Current Playlist'
              )
            }
          />
          <Tab
            className="Finder-tab"
            label={isEmpty(searchResults) ? 'Suggested' : 'Search Results'}
          />
          <Tab label="My Playlists" className="Finder-tab" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {searching ? (
          <div className="AddTracks-search-loading">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {tabIndex === 0 &&
              (isEmpty(playlistTracks) ? (
                <Paper className="Finder-no-tracks">
                  <Typography variant="h5" align="center" gutterBottom>
                    No tracks yet
                  </Typography>
                  <Typography variant="body2" align="center" gutterBottom>
                    Search for tracks or pick from your recommendations
                  </Typography>
                </Paper>
              ) : (
                <TrackList tracks={playlistTracks} />
              ))}
            {tabIndex === 1 && (
              <TrackList
                tracks={
                  !isEmpty(searchResults) ? searchResults : recommendations
                }
                filterList={playlistTracks}
                onSelected={onTrackSelected}
              />
            )}
            {tabIndex === 2 && (
              <Playlists
                user={user}
                playlists={userPlaylists}
                playlistsEnabled={event.settings.suggestingPlaylistsEnabled}
                onTrackSelected={onTrackSelected}
                onPlaylistSelected={onPlaylistSelected}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Finder
