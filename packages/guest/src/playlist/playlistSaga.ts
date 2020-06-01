import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, Playlist, PageObject } from 'mm-shared'
import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS
} from './playlistActions'
import { fetchUsersPlaylists } from './playlistClient'

function* fetchPlaylistsFlow(action: Action) {
  try {
    const { user, page } = action.payload
    console.log(page)
    const playlistsPage: PageObject<Playlist> = yield call(
      fetchUsersPlaylists,
      {
        user,
        limit: page.limit,
        offset: page.offset
      }
    )
    playlistsPage.items = [...page.items, ...playlistsPage.items]
    console.log(playlistsPage)
    yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: playlistsPage })
  } catch (error) {
    yield put({ type: FETCH_PLAYLISTS_ERROR, payload: error })
  }
}

export function* watchFetchPlaylists() {
  yield takeEvery(FETCH_PLAYLISTS, fetchPlaylistsFlow)
}
