import { call, put, select, takeEvery } from 'redux-saga/effects'
import { EVENT_FETCH_BY_ID_INITIATED } from 'event/eventActions'
import { Action } from 'mm-shared'
import {
  EDIT_PLAYLIST_REQUEST,
  EDIT_PLAYLIST_SUCCESS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  LOAD_MORE_PLAYLISTS_FAILURE,
  LOAD_MORE_PLAYLISTS_REQUEST,
  LOAD_MORE_PLAYLISTS_SUCCESS,
  SEARCH_TRACKS_REQUEST,
  searchTrackFailure,
  searchTrackSuccess
} from './playlistActions'
import {
  fetchMoreUsersPlaylists,
  fetchUsersPlaylists,
  searchForTracks,
  updatePlaylistDetails
} from './playlistClient'

function* fetchPlaylistsFlow(action: Action) {
  try {
    const playlists = yield call(fetchUsersPlaylists, action.payload)
    yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: FETCH_PLAYLISTS_ERROR, payload: error })
  }
}

function* fetchMorePlaylistsFlow(action: Action) {
  try {
    const playlists = yield call(
      fetchMoreUsersPlaylists,
      action.payload.user,
      action.payload.offset
    )
    yield put({ type: LOAD_MORE_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: LOAD_MORE_PLAYLISTS_FAILURE, payload: error })
  }
}

function* fetchSearchedTracks(action: Action) {
  try {
    const res = yield call(searchForTracks, action.payload)
    yield put(searchTrackSuccess(res))
  } catch (e) {
    yield put(searchTrackFailure(e.message))
  }
}

const getEventId = (state: any) => state.event.event.eventId

function* fetchPlaylistEditDetails({ payload }: Action) {
  try {
    const { playlistId, name, description } = payload
    yield call(updatePlaylistDetails, playlistId, name, description)

    const eventId = yield select(getEventId)
    yield put({ type: EDIT_PLAYLIST_SUCCESS })
    yield put({ type: EVENT_FETCH_BY_ID_INITIATED, payload: eventId })
  } catch (e) {
    console.error(e.message)
  }
}

export function* watchFetchMorePlaylistsFlow() {
  yield takeEvery(LOAD_MORE_PLAYLISTS_REQUEST, fetchMorePlaylistsFlow)
}

export function* watchFetchSearchTracks() {
  yield takeEvery(SEARCH_TRACKS_REQUEST, fetchSearchedTracks)
}

export function* watchFetchPlaylists() {
  yield takeEvery(FETCH_PLAYLISTS, fetchPlaylistsFlow)
}

export function* watchFetchPlaylistEditDetails() {
  yield takeEvery(EDIT_PLAYLIST_REQUEST, fetchPlaylistEditDetails)
}
