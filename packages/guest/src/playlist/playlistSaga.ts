import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared';
import {
  FETCH_MORE_PLAYLISTS_FAILURE,
  FETCH_MORE_PLAYLISTS_REQUEST,
  FETCH_MORE_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
} from './playlistActions'
import {
  fetchMoreUsersPlaylists,
  fetchUsersPlaylists,
} from './playlistClient'

function* fetchPlaylistsFlow(action: Action) {
  try {
    const playlists = yield call(fetchUsersPlaylists, action.payload)
    yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: FETCH_PLAYLISTS_ERROR, payload: error })
  }
}

const getOffset = (state: any) => state.playlist.offset

function* fetchMorePlaylistsFlow(action: Action) {
  try {
    const offset = yield select(getOffset)
    const playlists = yield call(fetchMoreUsersPlaylists, action.payload, offset)
    yield put({ type: FETCH_MORE_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: FETCH_MORE_PLAYLISTS_FAILURE, payload: error })
  }
}

export function* watchFetchMorePlaylistsFlow() {
  yield takeEvery(FETCH_MORE_PLAYLISTS_REQUEST, fetchMorePlaylistsFlow)
}

export function* watchFetchPlaylists() {
  yield takeEvery(FETCH_PLAYLISTS, fetchPlaylistsFlow)
}
