import { omit } from 'lodash'
import { call, put, takeEvery } from 'redux-saga/effects'
import { deleteEvent, getEventById, updateEvent } from '../event/eventClient'
import IEventSettings from '../event/IEventSettings'
import { EVENT_PLAYLIST_FETCHED } from '../eventPlaylist/eventPlaylistActions'
import IAction from '../IAction'
import IPlaylistItem from '../playlist/IPlaylistItem'
import { getTracksFeatures } from '../playlist/playlistActions'
import {
  EVENT_DELETE_FAILED,
  EVENT_DELETE_INITIATED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCH_BY_ID_NO_LOADING_INITIATED,
  EVENT_FETCHED_BY_ID,
  REFRESH_EVENT_PLAYLIST,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS
} from './eventViewActions'

function* fetchEventByIdFlow(action: IAction) {
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    const playlist = { ...event.playlist }
    if (!event.settings) {
      event.settings = {} as IEventSettings
    }
    yield put({ type: EVENT_FETCHED_BY_ID, payload: omit(event, ['playlist']) })
    yield put({ type: EVENT_PLAYLIST_FETCHED, payload: playlist })
    const trackIds = [] as string[]
    if (playlist.tracks.items.length > 0) {
      playlist.tracks.items.map((track: IPlaylistItem) => {
        trackIds.push(track.track.id)
      })
      if (trackIds.length > 0) {
        yield put(getTracksFeatures(trackIds))
      }
    }

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
    yield put({ type: EVENT_DELETE_SUCCESSFUL })
  } catch (err) {
    yield put({ type: EVENT_DELETE_FAILED, payload: err })
  }
}

export function* watchDeleteEvent() {
  yield takeEvery(EVENT_DELETE_INITIATED, deleteEventFlow)
}

export function* watchRefreshEventPlaylist() {
  yield takeEvery(REFRESH_EVENT_PLAYLIST, fetchEventByIdFlow)
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
