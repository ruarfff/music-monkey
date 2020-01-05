import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import { CLEAR_SEARCH, removeTrack } from '../search/searchActions'
import {
  DELETE_SUGGESTION_FAILED,
  DELETE_SUGGESTION_INITIATED,
  DELETE_SUGGESTION_SUCCESS,
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  SAVE_PLAYLIST_SUGGESTION_INITIATED,
  SAVE_SUGGESTION_FAILED,
  SAVE_SUGGESTION_SUCCESS,
  SAVE_TRACK_SUGGESTION_INITIATED
} from './suggestionActions'
import {
  bulkSaveSuggestions,
  deleteSuggestion,
  getEventSuggestions,
  saveSuggestion
} from './suggestionClient'
import SuggestionTransformer from './SuggestionTransformer'

const suggestionTransformer = new SuggestionTransformer()

function* fetchSuggestionsFlow(action: Action) {
  try {
    const suggestions = yield call(getEventSuggestions, action.payload)
    yield put({
      type: FETCH_SUGGESTIONS_SUCCESS,
      payload: suggestions
    })
  } catch (err) {
    yield put({ type: FETCH_SUGGESTIONS_FAILED, payload: err })
  }
}

export function* watchFetchSuggestions() {
  yield takeEvery(FETCH_SUGGESTIONS_INITIATED, fetchSuggestionsFlow)
}

function* saveTrackSuggestionFlow(action: Action) {
  try {
    const savedSuggestion = yield call(
      saveSuggestion,
      suggestionTransformer.trackSuggestionToSuggestion(action.payload)
    )
    yield put({ type: SAVE_SUGGESTION_SUCCESS, payload: savedSuggestion })
    yield put({ type: CLEAR_SEARCH })
    yield put(removeTrack(savedSuggestion.data.trackUri))
  } catch (err) {
    yield put({ type: SAVE_SUGGESTION_FAILED, payload: err })
  }
}

export function* watchSaveTrackSuggestion() {
  yield takeEvery(SAVE_TRACK_SUGGESTION_INITIATED, saveTrackSuggestionFlow)
}

function* savePlaylistSuggestionFlow(action: Action) {
  try {
    const savedSuggestions = yield call(
      bulkSaveSuggestions,
      suggestionTransformer.playlistSuggestionToSuggestions(action.payload)
    )
    yield put({ type: SAVE_SUGGESTION_SUCCESS, payload: savedSuggestions })
  } catch (err) {
    yield put({ type: SAVE_SUGGESTION_FAILED, payload: err })
  }
}

export function* watchSavePlaylistSuggestion() {
  yield takeEvery(
    SAVE_PLAYLIST_SUGGESTION_INITIATED,
    savePlaylistSuggestionFlow
  )
}

function* deleteSuggestionFlow(action: Action) {
  try {
    yield call(deleteSuggestion, action.payload)
    yield put({ type: DELETE_SUGGESTION_SUCCESS })
  } catch (err) {
    yield put({ type: DELETE_SUGGESTION_FAILED, payload: err })
  }
}

// TODO: Not implemented yet!!!
export function* watchDeleteSuggestion() {
  yield takeEvery(DELETE_SUGGESTION_INITIATED, deleteSuggestionFlow)
}
