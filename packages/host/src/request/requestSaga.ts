import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, getRequestsByEventId } from 'mm-shared'
import {
  FETCH_REQUESTS_FAILED,
  FETCH_REQUESTS_INITIATED,
  FETCH_REQUESTS_SUCCESS
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
