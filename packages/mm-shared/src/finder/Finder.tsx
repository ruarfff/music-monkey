import React, { FC, useEffect, useState } from 'react'
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Typography,
  Badge,
  Paper
} from '@material-ui/core'
import { DropResult } from 'react-beautiful-dnd'
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
  isHost?: boolean
  user: User
  eventTracks: Track[]
  events: Event[]
  userPlaylists: Playlist[]
  recommendations: Track[]
  allowSuggestPlaylist?: boolean
  hideCurrentPlaylist?: boolean
  getRecommendations(): Action
  fetchPlaylists(user: User): Action
  onTrackSelected?(track: Track): any
  onPlaylistSelected?(playlist: Playlist): any
  onTrackRemoved?(track: Track): any
  onTrackMoved?(from: number, to: number): any
}

const Finder: FC<FinderProps> = ({
  isHost = false,
  user,
  eventTracks,
  events,
  userPlaylists,
  recommendations = [],
  getRecommendations,
  fetchPlaylists,
  allowSuggestPlaylist = false,
  hideCurrentPlaylist = false,
  onTrackSelected = () => {},
  onPlaylistSelected = () => {},
  onTrackRemoved = () => {},
  onTrackMoved = () => {}
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

  return (
    <Grid container className="Finder-root" spacing={2}>
      <Grid item xs={12}>
        <TrackSearch
          onSearchResult={(results: Track[]) => {
            if (!isEqual(searchResults, results))
              setSearchResults(
                results.filter(
                  searchedTrack =>
                    eventTracks.map(t => t.uri).indexOf(searchedTrack.uri) ===
                    -1
                )
              )
            setSearching(false)
          }}
          onSearchStart={() => {
            setSearching(true)
          }}
          onFocus={() => {
            handleTabChange(hideCurrentPlaylist ? 0 : 1)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {!hideCurrentPlaylist && (
              <Tab
                className="Finder-tab"
                label={
                  !isEmpty(eventTracks) ? (
                    <Badge
                      className="Finder-playlist-count"
                      overlap="circle"
                      color={'secondary'}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      badgeContent={eventTracks.length}
                    >
                      Current Playlist
                    </Badge>
                  ) : (
                    'Current Playlist'
                  )
                }
              />
            )}
            <Tab
              className="Finder-tab"
              label={isEmpty(searchResults) ? 'Suggested' : 'Search Results'}
            />
            <Tab label="My Playlists" className="Finder-tab" />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {searching ? (
          <div className="AddTracks-search-loading">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {tabIndex === 0 &&
              !hideCurrentPlaylist &&
              (isEmpty(eventTracks) ? (
                <Paper className="Finder-no-tracks">
                  <Typography variant="h5" align="center" gutterBottom>
                    No tracks yet
                  </Typography>
                  <Typography variant="body2" align="center" gutterBottom>
                    Search for tracks or pick from your recommendations
                  </Typography>
                </Paper>
              ) : (
                <TrackList
                  tracks={eventTracks}
                  options={{
                    showSummary: true,
                    allowDragDrop: isHost,
                    canRemove: isHost
                  }}
                  onDragEnd={(result: DropResult) => {
                    if (!result.destination) {
                      return
                    }
                    onTrackMoved(result.source.index, result.destination.index)
                  }}
                  onRemoved={(track: Track) => {
                    onTrackRemoved(track)
                  }}
                />
              ))}
            {((hideCurrentPlaylist && tabIndex === 0) ||
              (!hideCurrentPlaylist && tabIndex === 1)) && (
              <TrackList
                options={{ canRequest: true }}
                tracks={
                  !isEmpty(searchResults) ? searchResults : recommendations
                }
                filterList={eventTracks}
                onSelected={onTrackSelected}
              />
            )}
            {((hideCurrentPlaylist && tabIndex === 1) ||
              (!hideCurrentPlaylist && tabIndex === 2)) && (
              <Playlists
                user={user}
                playlists={userPlaylists}
                playlistsEnabled={allowSuggestPlaylist || isHost}
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
