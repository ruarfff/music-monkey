import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import {
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  REJECT_SUGGESTION,
  REJECT_SUGGESTION_FAILED,
  REJECT_SUGGESTION_SUCCESS
} from './suggestionActions'
import { getEventSuggestions, rejectSuggestion } from './suggestionClient'

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

function* rejectSuggestionFlow(action: Action) {
  try {
    const rejectedSuggestion = yield call(rejectSuggestion, action.payload)
    yield put({ type: REJECT_SUGGESTION_SUCCESS, payload: rejectedSuggestion })
  } catch (err) {
    yield put({ type: REJECT_SUGGESTION_FAILED, payload: err })
  }
}

export function* watchRejectSuggestion() {
  yield takeEvery(REJECT_SUGGESTION, rejectSuggestionFlow)
}
