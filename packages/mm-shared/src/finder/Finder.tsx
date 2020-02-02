import React, { FC, useEffect, useState } from 'react'
import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty, isEqual } from 'lodash'
import SwipeableViews from 'react-swipeable-views'
import {
  Action,
  Event,
  Track,
  TrackRequest,
  User,
  Playlist,
  PlaylistRequest,
  TrackSearch,
  useSwipeTabsIndex,
  useSnackbarAlert
} from '../'
import MyPlaylistsTab from './MyPlaylistsTab'
import RecommendationsTab from './RecommendationsTab'
import SearchResults from './SearchResults'
import './Finder.scss'

interface FinderProps {
  user: User
  event: Event
  events: Event[]
  userPlaylists: Playlist[]
  recommendations: Track[]
  getRecommendations(): Action
  saveTrackRequest(request: TrackRequest): Action
  fetchPlaylists(user: User): Action
  savePlaylistRequest(request: PlaylistRequest): Action
  fetchMorePlaylists(user: User): Action
}

const Finder: FC<FinderProps> = ({
  user,
  event,
  events,
  userPlaylists,
  recommendations = [],
  getRecommendations,
  saveTrackRequest,
  fetchPlaylists,
  savePlaylistRequest,
  fetchMorePlaylists
}) => {
  useEffect(() => {
    if (!isEmpty(user) && isEmpty(userPlaylists)) {
      fetchPlaylists(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const { showSuccess } = useSnackbarAlert()
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

  const onSelected = (track: Track) => {
    saveTrackRequest({
      eventId: event.eventId,
      userId: user.userId,
      type: 'track',
      trackUri: track.uri
    } as TrackRequest)
    showSuccess('Track requested')
  }

  const onPlaylistSelected = (playlist: Playlist) => () => {
    savePlaylistRequest({
      eventId: event.eventId,
      userId: user.userId,
      playlistUri: playlist.uri,
      trackUris: playlist.tracks.items.map(t => t.track.uri)
    } as PlaylistRequest)
    showSuccess('Playlist requested')
  }

  const playlistTracks =
    !isEmpty(event) && !isEmpty(event.playlist)
      ? event.playlist!.tracks.items.map(track => track.track.uri)
      : []

  return (
    <div>
      <TrackSearch
        onSearchResult={(results: Track[]) => {
          if (!isEqual(searchResults, results))
            setSearchResults(
              results.filter(
                searchedTrack =>
                  playlistTracks.indexOf(searchedTrack.uri) === -1
              )
            )
          setSearching(false)
        }}
        onSearchStart={() => {
          setSearching(true)
        }}
      />
      <Divider variant="inset" className="Finder-divider" />
      {(searching || !isEmpty(searchResults)) && (
        <SearchResults tracks={searchResults} onSelected={onSelected} />
      )}
      {!searching && isEmpty(searchResults) && (
        <div>
          <Divider variant="inset" className="Finder-divider" />
          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              classes={{ indicator: 'indicator-color' }}
            >
              <Tab label="SUGGESTED" />
              <Tab label="MY PLAYLISTS" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis="x"
            index={tabIndex}
            onChangeIndex={handleTabChange}
          >
            {tabIndex === 0 ? (
              <RecommendationsTab
                recommendations={recommendations.filter(
                  searchedTrack =>
                    playlistTracks.indexOf(searchedTrack.uri) === -1
                )}
                getRecommendations={getRecommendations}
                onSelected={onSelected}
              />
            ) : (
              <div />
            )}

            {tabIndex === 1 ? (
              <MyPlaylistsTab
                user={user}
                playlistsEnabled={event.settings.suggestingPlaylistsEnabled}
                fetchMorePlaylists={fetchMorePlaylists}
                savePlaylistSuggestion={onPlaylistSelected}
                onSelected={onSelected}
                playlists={userPlaylists}
              />
            ) : (
              <div />
            )}
          </SwipeableViews>
        </div>
      )}
    </div>
  )
}

export default Finder
