import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, getRequestsByEventId, rejectRequest } from 'mm-shared'
import {
  FETCH_REQUESTS_FAILED,
  FETCH_REQUESTS_INITIATED,
  FETCH_REQUESTS_SUCCESS,
  REJECT_REQUEST,
  REJECT_REQUEST_FAILED,
  REJECT_REQUEST_SUCCESS
} from './requestActions'

function* fetchSuggestionsFlow(action: Action) {
  try {
    const suggestions = yield call(getRequestsByEventId, action.payload)

    yield put({
      type: FETCH_REQUESTS_SUCCESS,
      payload: suggestions
    })
  } catch (err) {
    yield put({ type: FETCH_REQUESTS_FAILED, payload: err })
  }
}

export function* watchFetchSuggestions() {
  yield takeEvery(FETCH_REQUESTS_INITIATED, fetchSuggestionsFlow)
}

function* rejectSuggestionFlow(action: Action) {
  try {
    const rejectedSuggestion = yield call(rejectRequest, action.payload)
    yield put({ type: REJECT_REQUEST_SUCCESS, payload: rejectedSuggestion })
  } catch (err) {
    yield put({ type: REJECT_REQUEST_FAILED, payload: err })
  }
}

export function* watchRejectSuggestion() {
  yield takeEvery(REJECT_REQUEST, rejectSuggestionFlow)
}
