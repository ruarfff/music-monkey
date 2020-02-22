import { call, put, takeEvery } from 'redux-saga/effects'
import {
  Action,
  EventSettings,
  Playlist,
  PlaylistItem,
  TrackVoteStatus
} from 'mm-shared'
import { deleteEvent, getEventById, updateEvent } from 'event/eventClient'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_DELETE_INITIATED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS,
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING,
  SORT_PLAYLIST_BY_VOTES_DESCENDING
} from './eventActions'
import { getEvents } from './eventClient'
import {
  reOrderPlaylist,
  replaceTracksInPlaylist
} from 'playlist/playlistClient'

function* fetchEventsFlow() {
  try {
    const events = yield call(getEvents)
    yield put({ type: EVENTS_FETCHED, payload: events })
  } catch (err) {
    yield put({ type: EVENTS_FETCH_ERROR, payload: err })
  }
}

export function* watchFetchEvents() {
  yield takeEvery(EVENTS_FETCH_INITIATED, fetchEventsFlow)
}

function* fetchEventByIdFlow(action: Action) {
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    if (!event.settings) {
      event.settings = {} as EventSettings
    }
    yield put({ type: EVENT_FETCHED_BY_ID, payload: event })
  } catch (err) {
    yield put({ type: EVENT_FETCH_BY_ID_ERROR, payload: err })
  }
}

export function* watchFetchEventById() {
  yield takeEvery(EVENT_FETCH_BY_ID_INITIATED, fetchEventByIdFlow)
}

function* deleteEventFlow(action: Action) {
  try {
    yield call(deleteEvent, action.payload)
    yield put({ type: EVENT_DELETE_SUCCESSFUL, eventId: action.payload })
  } catch (err) {
    console.error(err)
  }
}

export function* watchDeleteEvent() {
  yield takeEvery(EVENT_DELETE_INITIATED, deleteEventFlow)
}

function* toggleDynamicVotingFlow(action: Action) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        dynamicVotingEnabled: !event.settings.dynamicVotingEnabled
      } as EventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_DYNAMIC_VOTING_ERROR })
  }
}

export function* watchToggleDynamicVoting() {
  yield takeEvery(TOGGLE_DYNAMIC_VOTING, toggleDynamicVotingFlow)
}

function* toggleAutoAcceptSuggestions(action: Action) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        autoAcceptSuggestionsEnabled: !event.settings
          .autoAcceptSuggestionsEnabled
      } as EventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR })
  }
}

export function* watchToggleAutoAcceptSuggestions() {
  yield takeEvery(TOGGLE_AUTO_ACCEPT_SUGGESTIONS, toggleAutoAcceptSuggestions)
}

function* toggleSuggestingPlaylists(action: Action) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        suggestingPlaylistsEnabled: !event.settings.suggestingPlaylistsEnabled
      } as EventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR })
  }
}

export function* watchToggleSuggestingPlaylists() {
  yield takeEvery(TOGGLE_SUGGESTING_PLAYLISTS, toggleSuggestingPlaylists)
}

function moveItemInEventPlaylistFlow(action: Action) {
  try {
    const { playlist, fromIndex, toIndex } = action.payload
    reOrderPlaylist(playlist, fromIndex, toIndex)
  } catch (err) {
    console.error(err)
  }
}

export function* watchMoveItemInEventPlaylist() {
  yield takeEvery(MOVE_ITEM_IN_EVENT_PLAYLIST, moveItemInEventPlaylistFlow)
}

function sortPlaylistByVotesDescending(
  playlist: Playlist,
  votes: Map<string, TrackVoteStatus>
) {
  const playlistItems = [...playlist.tracks.items]
  playlistItems.sort((a: any, b: any) => {
    let numA = 0
    let numB = 0
    if (votes.has(a.track.uri)) {
      numA = votes.get(a.track.uri)!.numberOfVotes
    }
    if (votes.has(b.track.uri)) {
      numB = votes.get(b.track.uri)!.numberOfVotes
    }
    if (numA < numB) {
      return 1
    }
    if (numA > numB) {
      return -1
    }

    return 0
  })
  return {
    ...playlist,
    tracks: { ...playlist.tracks, items: playlistItems }
  }
}

function* sortPlaylistByVotesDescendingFlow({ payload }: Action) {
  const { playlist, votes } = payload
  const sortedPlaylist: Playlist = sortPlaylistByVotesDescending(
    playlist,
    votes
  )
  const trackIUris = sortedPlaylist.tracks.items.map(
    (p: PlaylistItem) => p.track.uri
  )
  yield call(replaceTracksInPlaylist, sortedPlaylist.id, trackIUris)
  yield put({
    type: PLAYLIST_SORTED_BY_VOTES_DESCENDING,
    payload: sortedPlaylist
  })
}

export function* watchSortPlaylistByVotesDescending() {
  yield takeEvery(
    SORT_PLAYLIST_BY_VOTES_DESCENDING,
    sortPlaylistByVotesDescendingFlow
  )
}
