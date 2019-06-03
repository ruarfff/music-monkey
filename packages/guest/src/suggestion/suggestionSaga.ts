import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction'
import { CLEAR_SEARCH, removeTrack } from '../search/searchActions'
import {
  DELETE_SUGGESTION_FAILED,
  DELETE_SUGGESTION_INITIATED,
  DELETE_SUGGESTION_SUCCESS,
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_USER_SUGGESTIONS_INITIATED,
  SAVE_PLAYLIST_SUGGESTION_INITIATED,
  SAVE_SUGGESTION_FAILED,
  SAVE_SUGGESTION_SUCCESS,
  SAVE_TRACK_SUGGESTION_INITIATED,
  FETCH_USER_SUGGESTIONS_SUCCESS,
  FETCH_USER_SUGGESTIONS_FAILED
} from './suggestionActions'
import {
  bulkSaveSuggestions,
  deleteSuggestion,
  getSuggestions,
  getUsersSuggestions,
  saveSuggestion
} from './suggestionClient'
import SuggestionTransformer from './SuggestionTransformer'

const suggestionTransformer = new SuggestionTransformer()

function* fetchSuggestionsFlow(action: IAction) {
  try {
    const suggestions = yield call(getSuggestions, action.payload)
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

function* fetchUsersSuggestionsFlow(action: IAction) {
  try {
    const suggestions = yield call(getUsersSuggestions, action.payload)
    yield put({
      type: FETCH_USER_SUGGESTIONS_SUCCESS,
      payload: suggestions
    })
  } catch (err) {
    yield put({ type: FETCH_USER_SUGGESTIONS_FAILED, payload: err })
  }
}

export function* watchFetchUsersSuggestions() {
  yield takeEvery(FETCH_USER_SUGGESTIONS_INITIATED, fetchUsersSuggestionsFlow)
}

function* saveTrackSuggestionFlow(action: IAction) {
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

function* savePlaylistSuggestionFlow(action: IAction) {
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

function* deleteSuggestionFlow(action: IAction) {
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
