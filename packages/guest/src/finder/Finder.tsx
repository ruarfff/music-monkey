import { AppBar, Divider, Tab, Tabs } from '@material-ui/core'
import { isEmpty, sortBy } from 'lodash'
import moment from 'moment'
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
import EventPicker from './EventPicker'
import './Finder.scss'
import MyPlaylistsTab from './MyPlaylistsTab'
import RecommendationsTab from './RecommendationsTab'
import SearchResults from './SearchResults'
import SelectedEvent from './SelectedEvent'

const SweetAlert = withReactContent(Swal) as any
const React = require('react')

interface IFinderProps extends RouteComponentProps<any> {
  user: IUser
  events: IEvent[]
  userPlaylists: IPlaylist[]
  selectedEvent: IEvent
  history: any
  searching: boolean
  searchResults: ITrack[]
  selectedUserPlaylist: IPlaylist
  selectEvent(event: IEvent): IAction
  deselectEvent(): IAction
  saveTrackSuggestion(suggestions: ITrackSuggestion): IAction
  fetchPlaylists(user: IUser): IAction
  selectPlaylist(playlist: IPlaylist): IAction
  savePlaylistSuggestion(suggestions: IPlaylistSuggestion): IAction
}

const Finder = ({
  user,
  events,
  selectedEvent,
  history,
  userPlaylists,
  selectedUserPlaylist,
  searching,
  searchResults,
  selectEvent,
  deselectEvent,
  saveTrackSuggestion,
  fetchPlaylists,
  selectPlaylist,
  savePlaylistSuggestion
}: IFinderProps) => {
  React.useEffect(
    () => {
      if (!isEmpty(user) && isEmpty(userPlaylists)) {
        fetchPlaylists(user)
      }
    },
    [user]
  )

  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  const onTrackSelected = (track: ITrack) => {
    showConfirmationDialog(user, selectedEvent, track, saveTrackSuggestion)
  }

  const onPlaylistSelected = (playlist: IPlaylist) => () => {
    if (selectedEvent.settings.suggestingPlaylistsEnabled) {
      showConfirmationPlaylistDialog(
        user,
        selectedEvent,
        playlist,
        savePlaylistSuggestion
      )
    } else {
      showErrorPlaylistDialog()
    }

  }

  const playlistTracks = !isEmpty(selectedEvent)
    ? selectedEvent.playlist.tracks.items.map(track => track.track.uri)
    : []

  let filteredSearch = [] as ITrack[]

  if (!isEmpty(searchResults)) {
    filteredSearch = searchResults.filter(
      searchedTrack => playlistTracks.indexOf(searchedTrack.uri) === -1
    )
  }

  const now = moment()

  let sortedEvents = [] as IEvent[]

  if (!isEmpty(events)) {
    const pastEvents = sortBy(
      events.filter(
        event => now.isAfter(event.endDateTime)
      ), 'endDateTime'
    ).reverse()

    const liveEvents = sortBy(
      events
        .filter(
          event =>
            now.isAfter(event.startDateTime) && now.isBefore(event.endDateTime)
        ),'endDateTime'
    ).reverse()

    const upcomingEvents = sortBy(
      events
        .filter(
          event => now.isBefore(event.startDateTime)
        ), 'endDateTime'
    ).reverse()


    sortedEvents = pastEvents.concat(liveEvents, upcomingEvents)
  }

  return (
    <div>
      {isEmpty(selectedEvent) && !isEmpty(sortedEvents) && (
        <EventPicker events={sortedEvents} onSelectEvent={selectEvent} />
      )}
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
              fullWidth={true}
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
                selectedEvent={selectedEvent}
                savePlaylistSuggestion={onPlaylistSelected}
                onTrackSelected={onTrackSelected}
                playlists={userPlaylists}
                selectedUserPlaylist={selectedUserPlaylist}
                selectPlaylist={selectPlaylist}
                attached={false}
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

function showErrorPlaylistDialog() {
  SweetAlert.fire({
    title: 'Suggest playlist',
    text: 'Playlist submission not allowed by host currently',
    type: 'error',
    confirmButtonColor: '#ffb000',
    cancelButtonColor: '#e0e0e0',
    confirmButtonText: 'Suggest it!'
  })
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
