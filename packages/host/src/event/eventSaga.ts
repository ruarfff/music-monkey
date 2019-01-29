import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import { FETCH_PLAYLISTS } from '../playlist/playlistActions'
import { createPlaylist } from '../playlist/playlistClient'
import {
  EVENT_CONTENT_UPDATED,
  EVENT_CREATE_PLAYLIST_INITIATED,
  EVENT_EDIT_FAILURE,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_LOCATION_ERROR,
  EVENT_LOCATION_POPULATED,
  EVENT_LOCATION_SELECTED,
  EVENT_PLAYLIST_CREATED,
  EVENT_PLAYLIST_CREATION_ERROR,
  EVENT_SAVE_ERROR,
  EVENT_SAVE_INITIATED,
  EVENT_SAVED,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  SET_CREATE_EVENT_STEP
} from './eventActions'
import { createEvent, getEvents, updateEvent } from './eventClient'
import IEvent from './IEvent'

const { geocodeByAddress, getLatLng } = require('react-places-autocomplete')

function savePlaylist(playlistDetails: IPlaylistDetails) {
  const { name, description } = playlistDetails

  return createPlaylist(name, description)
}

function* createPlaylistFlow(action: IAction) {
  const playlistDetails: IPlaylistDetails = action.payload
  try {
    const playlist = yield call(savePlaylist, playlistDetails)
    yield put({
      payload: playlist,
      type: EVENT_PLAYLIST_CREATED
    })
    yield put({type: FETCH_PLAYLISTS, payload: playlistDetails.user})
  } catch (error) {
    yield put({ type: EVENT_PLAYLIST_CREATION_ERROR, payload: error })
  }
}

function* eventPlaylistCreatedFlow(action: IAction) {
  const playlist: IPlaylist = action.payload
  yield put({
    payload: { playlistUrl: playlist.external_urls.spotify },
    type: EVENT_CONTENT_UPDATED
  })
}

function fetchLatLng(address: string) {
  return geocodeByAddress(address).then((results: any) => getLatLng(results[0]))
}

function* fetchLatLngFlow(action: IAction) {
  const address: string = action.payload
  try {
    const latLng = yield call(fetchLatLng, address)
    yield put({
      payload: { address, latLng },
      type: EVENT_LOCATION_POPULATED
    })
  } catch (error) {
    yield put({ type: EVENT_LOCATION_ERROR, payload: error })
  }
}

function* saveEventFlow(action: IAction) {
  const event: IEvent = action.payload
  try {
    const savedEvent = yield call(createEvent, event)
    yield put({
      payload: savedEvent,
      type: EVENT_SAVED
    })
    yield put({type: SET_CREATE_EVENT_STEP, payload: 2})
  } catch (err) {
    yield put({ type: EVENT_SAVE_ERROR, payload: err })
  }
}

function* updateEventFlow(action: IAction) {
  const event: IEvent = action.payload

  try {
    const editedEvent = yield call(updateEvent, event)
    yield put({
      payload: editedEvent,
      type: EVENT_EDIT_SUCCESS
    })
  } catch (err) {
    yield put({ type: EVENT_EDIT_FAILURE, payload: err })
  }
}

function* fetchEventsFlow() {
  try {
    const events = yield call(getEvents)
    yield put({ type: EVENTS_FETCHED, payload: events })
  } catch (err) {
    yield put({ type: EVENTS_FETCH_ERROR, payload: err })
  }
}

export function* watchCreateEventPlaylist() {
  yield takeEvery(EVENT_CREATE_PLAYLIST_INITIATED, createPlaylistFlow)
}

export function* watchEventPlaylistCreated() {
  yield takeEvery(EVENT_PLAYLIST_CREATED, eventPlaylistCreatedFlow)
}

export function* watchUpdateLocationAutoComplete() {
  yield takeEvery(EVENT_LOCATION_SELECTED, fetchLatLngFlow)
}

export function* watchCreateEvent() {
  yield takeEvery(EVENT_SAVE_INITIATED, saveEventFlow)
}

export function* watchFetchEvents() {
  yield takeEvery(EVENTS_FETCH_INITIATED, fetchEventsFlow)
}

export function* watchUpdateEvent() {
  yield takeEvery(EVENT_EDIT_REQUEST, updateEventFlow)
}
