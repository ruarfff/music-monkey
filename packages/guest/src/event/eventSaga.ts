import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction'
import {
  EVENT_PLAYLISTS_LOADED,
  PLAYLIST_SELECTED
} from '../playlist/playlistActions'
import {
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  FETCH_USERS_EVENTS,
  FETCH_USERS_EVENTS_ERROR,
  FETCH_USERS_EVENTS_SUCCESS
} from './eventActions'
import { getEventById, getUsersInvitedEvents } from './eventClient'

function* fetchEventFlow(action: IAction) {
  console.log(`Getting event with action`, action)
  const eventId: string = action.payload
  try {
    const event = yield call(getEventById, eventId)
    yield put({ type: EVENT_FETCHED, payload: event })
    yield put({ type: PLAYLIST_SELECTED, payload: event.playlist })
  } catch (err) {
    yield put({ type: EVENT_FETCH_ERROR, payload: err })
  }
}

export function* watchFetchEvent() {
  yield takeEvery(EVENT_FETCH_INITIATED, fetchEventFlow)
}

function* fetchUsersEventsFlow() {
  try {
    const events = yield call(getUsersInvitedEvents)
    yield put({ type: FETCH_USERS_EVENTS_SUCCESS, payload: events })
    yield put({ type: EVENT_PLAYLISTS_LOADED, payload: events })
  } catch (err) {
    yield put({ type: FETCH_USERS_EVENTS_ERROR, payload: err })
  }
}

export function* watchFetchUsersEvents() {
  yield takeEvery(FETCH_USERS_EVENTS, fetchUsersEventsFlow)
}
