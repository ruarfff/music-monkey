import React, { useEffect } from 'react'
import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import swal from '@sweetalert/with-react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import EventPicker from 'event/components/EventPickerContainer'
import SelectedEvent from 'event/components/SelectedEvent'
import Search from 'search/SearchContainer'
import IPlaylistSuggestion from 'suggestion/IPlaylistSuggestion'
import ITrackSuggestion from 'suggestion/ITrackSuggestion'
import { Action, Event, Track, User, Playlist } from 'mm-shared'
import useSwipeTabsIndex from 'util/useSwipeTabsIndex'
import MyPlaylistsTab from './MyPlaylistsTab'
import RecommendationsTab from './RecommendationsTab'
import SearchResults from './SearchResults'
import './Finder.scss'

interface IFinderProps extends RouteComponentProps<any> {
  user: User
  userPlaylists: Playlist[]
  events: Event[]
  selectedEvent: Event
  searching: boolean
  searchResults: Track[]
  deselectEvent(): Action
  saveTrackSuggestion(suggestions: ITrackSuggestion): Action
  fetchPlaylists(user: User): Action
  savePlaylistSuggestion(suggestions: IPlaylistSuggestion): Action
  fetchMorePlaylists(user: User): Action
  setEventId(eventId: string): Action
}

const Finder = ({
  user,
  userPlaylists,
  events,
  selectedEvent,
  searching,
  searchResults,
  deselectEvent,
  saveTrackSuggestion,
  fetchPlaylists,
  savePlaylistSuggestion,
  fetchMorePlaylists,
  setEventId,
  match
}: IFinderProps) => {
  const eventId = match.params.eventId
  useEffect(() => {
    const selectedEventId = selectedEvent ? selectedEvent.eventId : ''
    if (eventId && selectedEventId !== eventId) {
      setEventId(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  useEffect(() => {
    if (!isEmpty(user) && isEmpty(userPlaylists)) {
      fetchPlaylists(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  if (isEmpty(events)) {
    return (
      <Typography align={'center'} variant={'h6'}>
        You don't have any events yet.
      </Typography>
    )
  }

  const onTrackSelected = (track: Track) => {
    showConfirmationDialog(user, selectedEvent, track, saveTrackSuggestion)
  }

  const onPlaylistSelected = (playlist: Playlist) => () => {
    showConfirmationPlaylistDialog(
      user,
      selectedEvent,
      playlist,
      savePlaylistSuggestion
    )
  }

  const playlistTracks =
    !isEmpty(selectedEvent) && !isEmpty(selectedEvent.playlist)
      ? selectedEvent.playlist!.tracks.items.map(track => track.track.uri)
      : []

  let filteredSearch = [] as Track[]

  if (!isEmpty(searchResults)) {
    filteredSearch = searchResults.filter(
      searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
    )
  }

  return (
    <div>
      <Search />
      <Divider variant="inset" className="Finder-divider" />
      {(searching || !isEmpty(filteredSearch)) && (
        <SearchResults
          tracks={filteredSearch}
          onTrackSelected={onTrackSelected}
        />
      )}
      {!searching && isEmpty(filteredSearch) && (
        <div>
          {isEmpty(selectedEvent) && <EventPicker />}
          {!isEmpty(selectedEvent) && (
            <SelectedEvent
              event={selectedEvent}
              deselectEvent={deselectEvent}
            />
          )}
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
              <Tab label="RECOMMENDED" />
              <Tab label="MY PLAYLISTS" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis="x"
            index={tabIndex}
            onChangeIndex={handleTabChange}
          >
            {tabIndex === 0 ? (
              <RecommendationsTab onTrackSelected={onTrackSelected} />
            ) : (
              <div />
            )}

            {tabIndex === 1 ? (
              <MyPlaylistsTab
                user={user}
                playlistsEnabled={
                  selectedEvent.settings.suggestingPlaylistsEnabled
                }
                fetchMorePlaylists={fetchMorePlaylists}
                savePlaylistSuggestion={onPlaylistSelected}
                onTrackSelected={onTrackSelected}
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

function showConfirmationPlaylistDialog(
  user: User,
  event: Event,
  playlist: Playlist,
  savePlaylistSuggestion: any
) {
  return showDialog(playlist.name, event.name, 'Playlist').then(
    (result: any) => {
      if (result === 'ok') {
        savePlaylistSuggestion({
          eventId: event.eventId,
          userId: user.userId,
          playlistUri: playlist.uri,
          trackUris: playlist.tracks.items.map(t => t.track.uri)
        } as IPlaylistSuggestion)
        swal(
          'Thanks for your suggestion!',
          `You suggested the playlist ${playlist.name}`,
          'success'
        )
      }
    }
  )
}

function showConfirmationDialog(
  user: User,
  event: Event,
  track: Track,
  saveTrackSuggestion: any
) {
  return showDialog(track.name, event.name, 'Track').then((result: any) => {
    if (result === 'ok') {
      saveTrackSuggestion({
        eventId: event.eventId,
        userId: user.userId,
        type: 'track',
        trackUri: track.uri
      } as ITrackSuggestion)
      swal(
        'Thanks for your suggestion!',
        `You suggested the track ${track.name}`,
        'success'
      )
    }
  })
}

function showDialog(itemName: string, eventName: string, type: string) {
  return swal({
    title: `Suggest ${type}?`,
    content: (
      <span>
        Suggest <strong>{itemName}</strong> for event{' '}
        <strong>{eventName}</strong>?
      </span>
    ),
    buttons: {
      ok: {
        text: 'Suggest it!',
        visible: true,
        closeModal: true
      },
      cancel: {
        text: 'Cancel',
        visible: true,
        closeModal: true
      }
    }
  })
}

export default Finder
