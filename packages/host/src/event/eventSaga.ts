import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from 'IAction'
import { deleteEvent, getEventById, updateEvent } from 'event/eventClient'
import IEventSettings from 'event/IEventSettings'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_DELETE_INITIATED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCH_BY_ID_NO_LOADING_INITIATED,
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS,
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_ERROR,
  SAVE_EVENT_PLAYLIST_SUCCESS,
  SORT_PLAYLIST_BY_VOTES_DESCENDING
} from './eventActions'
import { CLEAR_STAGED_SUGGESTIONS } from 'suggestion/suggestionActions'
import { getEvents } from './eventClient'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistItem from 'playlist/IPlaylistItem'
import {
  reOrderPlaylist,
  replaceTracksInPlaylist
} from 'playlist/playlistClient'
import { addTracksToPlaylist } from 'playlist/playlistClient'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import { acceptSuggestions } from 'suggestion/suggestionClient'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'

interface ISavePlaylistArgs {
  eventId: string
  playlist: IPlaylist
  suggestions: Map<string, IDecoratedSuggestion>
}

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

function* fetchEventByIdFlow(action: IAction) {
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    if (!event.settings) {
      event.settings = {} as IEventSettings
    }
    yield put({ type: EVENT_FETCHED_BY_ID, payload: event })
  } catch (err) {
    yield put({ type: EVENT_FETCH_BY_ID_ERROR, payload: err })
  }
}

export function* watchFetchEventById() {
  yield takeEvery(EVENT_FETCH_BY_ID_INITIATED, fetchEventByIdFlow)
}

export function* watchFetchEventByIdNoLoading() {
  yield takeEvery(EVENT_FETCH_BY_ID_NO_LOADING_INITIATED, fetchEventByIdFlow)
}

function* deleteEventFlow(action: IAction) {
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

function* toggleDynamicVotingFlow(action: IAction) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        dynamicVotingEnabled: !event.settings.dynamicVotingEnabled
      } as IEventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_DYNAMIC_VOTING_ERROR })
  }
}

export function* watchToggleDynamicVoting() {
  yield takeEvery(TOGGLE_DYNAMIC_VOTING, toggleDynamicVotingFlow)
}

function* toggleAutoAcceptSuggestions(action: IAction) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        autoAcceptSuggestionsEnabled: !event.settings
          .autoAcceptSuggestionsEnabled
      } as IEventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR })
  }
}

export function* watchToggleAutoAcceptSuggestions() {
  yield takeEvery(TOGGLE_AUTO_ACCEPT_SUGGESTIONS, toggleAutoAcceptSuggestions)
}

function* toggleSuggestingPlaylists(action: IAction) {
  try {
    const event = action.payload
    yield call(updateEvent, {
      ...event,
      settings: {
        ...event.settings,
        suggestingPlaylistsEnabled: !event.settings.suggestingPlaylistsEnabled
      } as IEventSettings
    })
  } catch (err) {
    yield put({ type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR })
  }
}

export function* watchToggleSuggestingPlaylists() {
  yield takeEvery(TOGGLE_SUGGESTING_PLAYLISTS, toggleSuggestingPlaylists)
}

async function saveEventPlaylist({
  eventId,
  playlist,
  suggestions
}: ISavePlaylistArgs) {
  if (!playlist) {
    return Promise.reject(new Error('No Event Playlist'))
  }
  const playlistTrackUris: string[] = playlist.tracks.items.map(
    pl => pl.track.uri
  )
  const suggestedTrackUris: string[] = Array.from(suggestions.keys())

  const trackUrisNotInPlaylist = suggestedTrackUris.filter(
    trackUri => !playlistTrackUris.includes(trackUri)
  )

  if (trackUrisNotInPlaylist.length < 1) {
    await acceptSuggestions(
      eventId,
      Array.from(suggestions.values()).map(s => s.suggestion)
    )
    return eventId
  }

  await addTracksToPlaylist(playlist.id, trackUrisNotInPlaylist)
  await acceptSuggestions(
    eventId,
    Array.from(suggestions.values()).map(s => s.suggestion)
  )
  return eventId
}

function* saveEventPlaylistFlow(action: IAction) {
  try {
    const eventId = yield call(saveEventPlaylist, action.payload)
    yield put({ type: SAVE_EVENT_PLAYLIST_SUCCESS })
    yield put({ type: CLEAR_STAGED_SUGGESTIONS })
    yield put({ type: EVENT_FETCH_BY_ID_INITIATED, payload: eventId })
  } catch (err) {
    yield put({ type: SAVE_EVENT_PLAYLIST_ERROR, payload: err })
  }
}

export function* watchSaveEventPlaylist() {
  yield takeEvery(SAVE_EVENT_PLAYLIST, saveEventPlaylistFlow)
}

function moveItemInEventPlaylistFlow(action: IAction) {
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
  playlist: IPlaylist,
  votes: Map<string, ITrackVoteStatus>
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

function* sortPlaylistByVotesDescendingFlow({ payload }: IAction) {
  const { playlist, votes } = payload
  const sortedPlaylist: IPlaylist = sortPlaylistByVotesDescending(
    playlist,
    votes
  )
  const trackIUris = sortedPlaylist.tracks.items.map(
    (p: IPlaylistItem) => p.track.uri
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
