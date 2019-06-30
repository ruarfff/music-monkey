import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import Search from '../search/SearchContainer'
import IPlaylistSuggestion from '../suggestion/IPlaylistSuggestion'
import ITrackSuggestion from '../suggestion/ITrackSuggestion'
import ITrack from '../track/ITrack'
import IUser from '../user/IUser'
import useSwipeTabsIndex from '../util/useSwipeTabsIndex'
import EventPicker from '../event/components/EventPickerContainer'
import MyPlaylistsTab from './MyPlaylistsTab'
import RecommendationsTab from './RecommendationsTab'
import SearchResults from './SearchResults'
import SelectedEvent from './SelectedEvent'
import React, { useEffect } from 'react'
import './Finder.scss'

const SweetAlert = withReactContent(Swal) as any

interface IFinderProps extends RouteComponentProps<any> {
  user: IUser
  userPlaylists: IPlaylist[]
  events: IEvent[]
  selectedEvent: IEvent
  searching: boolean
  searchResults: ITrack[]
  deselectEvent(): IAction
  saveTrackSuggestion(suggestions: ITrackSuggestion): IAction
  fetchPlaylists(user: IUser): IAction
  savePlaylistSuggestion(suggestions: IPlaylistSuggestion): IAction
  fetchMorePlaylists(user: IUser): IAction
  setEventId(eventId: string): IAction
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
    if (eventId && eventId !== selectedEvent.eventId) setEventId(eventId)
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

  if (isEmpty(selectedEvent)) {
    return <EventPicker />
  }

  const onTrackSelected = (track: ITrack) => {
    showConfirmationDialog(user, selectedEvent, track, saveTrackSuggestion)
  }

  const onPlaylistSelected = (playlist: IPlaylist) => () => {
    showConfirmationPlaylistDialog(
      user,
      selectedEvent,
      playlist,
      savePlaylistSuggestion
    )
  }

  const playlistTracks =
    !isEmpty(selectedEvent) && !isEmpty(selectedEvent.playlist)
      ? selectedEvent.playlist.tracks.items.map(track => track.track.uri)
      : []

  let filteredSearch = [] as ITrack[]

  if (!isEmpty(searchResults)) {
    filteredSearch = searchResults.filter(
      searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
    )
  }

  return (
    <div>
      <Search />
      {(searching || !isEmpty(filteredSearch)) && (
        <SearchResults
          tracks={filteredSearch}
          onTrackSelected={onTrackSelected}
        />
      )}
      {!searching && isEmpty(filteredSearch) && (
        <div>
          <Divider variant="inset" className="Finder-divider" />
          <SelectedEvent event={selectedEvent} deselectEvent={deselectEvent} />
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
  user: IUser,
  event: IEvent,
  playlist: IPlaylist,
  savePlaylistSuggestion: any
) {
  SweetAlert.fire({
    title: 'Suggest this playlist?',
    text: `Suggest ${playlist.name} for the event ${event.name}`,
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ffb000',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Suggest it!'
  }).then((result: any) => {
    if (result.value) {
      savePlaylistSuggestion({
        eventId: event.eventId,
        userId: user.userId,
        playlistUri: playlist.uri,
        trackUris: playlist.tracks.items.map(t => t.track.uri)
      } as IPlaylistSuggestion)
    }
  })
}

function showConfirmationDialog(
  user: IUser,
  event: IEvent,
  track: ITrack,
  saveTrackSuggestion: any
) {
  SweetAlert.fire({
    title: 'Suggest this track?',
    text: `Suggest ${track.name} for the event ${event.name}`,
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ffb000',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Suggest it!'
  }).then((result: any) => {
    if (result.value) {
      saveTrackSuggestion({
        eventId: event.eventId,
        userId: user.userId,
        type: 'track',
        trackUri: track.uri
      } as ITrackSuggestion)
    }
  })
}

export default Finder
