import { call, put, takeEvery } from 'redux-saga/effects'
import { omit } from 'lodash'
import IAction from 'IAction'
import { deleteEvent, getEventById, updateEvent } from 'event/eventClient'
import IEventSettings from 'event/IEventSettings'
import { EVENT_PLAYLIST_FETCHED } from 'event/eventPlaylist/eventPlaylistActions'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
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
} from './eventActions'
import { getEvents } from './eventClient'

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
    const playlist = { ...event.playlist }
    if (!event.settings) {
      event.settings = {} as IEventSettings
    }
    yield put({ type: EVENT_FETCHED_BY_ID, payload: omit(event, ['playlist']) })
    yield put({ type: EVENT_PLAYLIST_FETCHED, payload: playlist })
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
