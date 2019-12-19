import { call, put, takeEvery } from 'redux-saga/effects'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED
} from './eventActions'
import { getEvents } from './eventClient'

function* fetchEventsFlow() {
  try {
    const events = yield call(getEvents)
    yield put({ type: EVENTS_FETCHED, payload: events })
  } catch (err) {
    yield put({ type: EVENTS_FETCH_ERROR, payload: err })
  }
}

export function* watchFetchEvents() {
  yield takeEvery(EVENTS_FETCH_INITIATED, fetchEventsFlow)
}
