import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import { Track }  from 'mm-shared'
import {
  SEARCH_FAILED,
  SEARCH_INITIATED,
  SEARCH_SUCCESS
} from './searchActions'
import * as searchClient from './searchClient'

function searchTracks(searchTerm: string) {
  return searchClient.search(searchTerm).then(response => response.tracks.items)
}

function* searchTracksFlow(action: Action) {
  try {
    const tracks: Track[] = yield call(searchTracks, action.payload)
    yield put({ type: SEARCH_SUCCESS, payload: tracks })
  } catch (err) {
    yield put({ type: SEARCH_FAILED, payload: err })
  }
}

export function* watchSearch() {
  yield takeEvery(SEARCH_INITIATED, searchTracksFlow)
}
