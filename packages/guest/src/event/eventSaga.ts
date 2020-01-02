import { call, put, takeEvery } from 'redux-saga/effects'
import { sortBy } from 'lodash'
import { Action, Event } from 'mm-shared'
import {
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  FETCH_USERS_EVENTS,
  FETCH_USERS_EVENTS_ERROR,
  FETCH_USERS_EVENTS_SUCCESS
} from './eventActions'
import { getEventById, getUsersInvitedEvents } from './eventClient'

function* fetchEventFlow(action: Action) {
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    yield put({ type: EVENT_FETCHED, payload: event })
  } catch (err) {
    yield put({ type: EVENT_FETCH_ERROR, payload: err })
  }
}

export function* watchFetchEvent() {
  yield takeEvery(EVENT_FETCH_INITIATED, fetchEventFlow)
}

function* fetchUsersEventsFlow() {
  try {
    let events: Event[] = yield call(getUsersInvitedEvents)
    events = sortBy(events || [], 'endDateTime').reverse()
    yield put({ type: FETCH_USERS_EVENTS_SUCCESS, payload: events })
  } catch (err) {
    yield put({ type: FETCH_USERS_EVENTS_ERROR, payload: err })
  }
}

export function* watchFetchUsersEvents() {
  yield takeEvery(FETCH_USERS_EVENTS, fetchUsersEventsFlow)
}
