import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  SET_EVENT_PLAYLIST,
  UPDATE_PLAYLIST_AFTER_COPY
} from './eventPlaylist/eventPlaylistActions'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistDetails from 'playlist/IPlaylistDetails'
import { FETCH_PLAYLISTS } from 'playlist/playlistActions'
import {
  createPlaylist,
  replaceTracksInPlaylist
} from 'playlist/playlistClient'
import IUser from 'user/IUser'
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
    yield put({
      type: SET_EVENT_PLAYLIST,
      payload: {
        ...playlist,
        name: playlistDetails.name
      }
    })
    yield put({ type: FETCH_PLAYLISTS, payload: playlistDetails.user })
  } catch (error) {
    yield put({ type: EVENT_PLAYLIST_CREATION_ERROR, payload: error })
  }
}

function* eventPlaylistCreatedFlow(action: IAction) {
  const playlist: IPlaylist = action.payload
  if (playlist && playlist.external_urls)
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

const getEventPlaylist = (state: any) => state.eventPlaylist.playlist
const getEvent = (state: any) => state.event
const getJustCreatedPlaylists = (state: any) => state.playlist.createdPlaylists
const getUser = (state: any) => state.user.data

function* saveEventFlow(action: IAction) {
  const event: IEvent = action.payload
  let copiedPlaylist

  try {
    const eventPlaylist = yield select(getEventPlaylist)
    const event = yield select(getEvent)
    const justCreatePlaylists = yield select(getJustCreatedPlaylists)

    const playlistDetails: IPlaylistDetails = {
      name: event.savingEvent.name || eventPlaylist.name,
      description: eventPlaylist.description,
      user: {} as IUser
    }

    const isJustCreated =
      justCreatePlaylists.filter(
        (playlist: any) => playlist.id === eventPlaylist.id
      ).length === 1

    if (eventPlaylist.tracks.items.length > 0 && !isJustCreated) {
      const tracksToCopy = eventPlaylist.tracks.items.map(
        (item: any) => item.track.uri
      )

      copiedPlaylist = yield call(savePlaylist, playlistDetails)
      yield call(replaceTracksInPlaylist, copiedPlaylist.id, tracksToCopy)
    }
  } catch (err) {
    console.log(err.message)
  }

  try {
    let savedEvent
    const user: any = yield select(getUser)

    if (copiedPlaylist) {
      savedEvent = yield call(createEvent, {
        ...event,
        playlistUrl: copiedPlaylist.external_urls.spotify,
        userId: user.userId
      })
      yield put({ type: UPDATE_PLAYLIST_AFTER_COPY, payload: copiedPlaylist })
      yield put({ type: FETCH_PLAYLISTS, payload: user })
    } else {
      savedEvent = yield call(createEvent, {
        ...event,
        userId: user.userId
      })
    }

    yield put({
      payload: {
        ...savedEvent,
        userId: user.userId
      },
      type: EVENT_SAVED
    })
    yield put({ type: SET_CREATE_EVENT_STEP, payload: 1 })
  } catch (err) {
    yield put({ type: EVENT_SAVE_ERROR, payload: err })
  }
}

const getCurrentStep = (state: any) => state.event.createEventStep
const getIsReselectedPlaylist = (state: any) => state.event.playlistReselected

function* updateEventFlow(action: IAction) {
  const event: IEvent = action.payload

  let copiedPlaylist
  const eventPlaylist: any = yield select(getEventPlaylist)
  const currentStep: number = yield select(getCurrentStep)
  const isReselected: boolean = yield select(getIsReselectedPlaylist)

  try {
    const event = yield select(getEvent)
    const justCreatePlaylists = yield select(getJustCreatedPlaylists)
    const playlistDetails: IPlaylistDetails = {
      name: event.playlistInput || eventPlaylist.name,
      description: eventPlaylist.description,
      user: {} as IUser
    }

    const isJustCreated =
      justCreatePlaylists.filter(
        (playlist: any) => playlist.id === eventPlaylist.id
      ).length === 1

    if (
      eventPlaylist.tracks.items.length > 0 &&
      !isJustCreated &&
      currentStep === 0 &&
      isReselected
    ) {
      const tracksToCopy = eventPlaylist.tracks.items.map(
        (item: any) => item.track.uri
      )

      copiedPlaylist = yield call(savePlaylist, playlistDetails)

      yield call(replaceTracksInPlaylist, copiedPlaylist.id, tracksToCopy)
    }
  } catch (err) {
    console.log(err.message)
  }

  try {
    let editedEvent
    const user: any = yield select(getUser)

    if (copiedPlaylist && currentStep === 0) {
      editedEvent = yield call(updateEvent, {
        ...event,
        playlistUrl: copiedPlaylist.external_urls.spotify
      })
      yield put({ type: UPDATE_PLAYLIST_AFTER_COPY, payload: copiedPlaylist })
      yield put({ type: FETCH_PLAYLISTS, payload: user })
    } else {
      editedEvent = yield call(updateEvent, event)
    }

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
