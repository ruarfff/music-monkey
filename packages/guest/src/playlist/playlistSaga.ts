import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, Playlist } from 'mm-shared'
import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS
} from './playlistActions'
import { fetchUsersPlaylists } from './playlistClient'
import PageObject from './PageObject'

function* fetchPlaylistsFlow(action: Action) {
  try {
    const page: PageObject<Playlist> = yield call(fetchUsersPlaylists, {
      user: action.payload,
      limit: 50,
      offset: 0
    })
    yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: page.items })
  } catch (error) {
    yield put({ type: FETCH_PLAYLISTS_ERROR, payload: error })
  }
}

export function* watchFetchPlaylists() {
  yield takeEvery(FETCH_PLAYLISTS, fetchPlaylistsFlow)
}
