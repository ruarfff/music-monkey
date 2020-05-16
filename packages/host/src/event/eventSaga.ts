import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, EventSettings } from 'mm-shared'
import { deleteEvent, getEventById } from 'event/eventClient'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_DELETE_INITIATED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCHED_BY_ID
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

function* fetchEventByIdFlow(action: Action) {
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    if (!event.settings) {
      event.settings = {} as EventSettings
    }
    yield put({ type: EVENT_FETCHED_BY_ID, payload: event })
  } catch (err) {
    yield put({ type: EVENT_FETCH_BY_ID_ERROR, payload: err })
  }
}

export function* watchFetchEventById() {
  yield takeEvery(EVENT_FETCH_BY_ID_INITIATED, fetchEventByIdFlow)
}

function* deleteEventFlow(action: Action) {
  try {
    yield call(deleteEvent, action.payload)
    yield put({ type: EVENT_DELETE_SUCCESSFUL, eventId: action.payload })
  } catch (err) {
    console.error(err)
  }
}

export function* watchDeleteEvent() {
  yield takeEvery(EVENT_DELETE_INITIATED, deleteEventFlow)
}
