import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction'
import {
  FETCH_OR_CREATE_RSVP_FAILURE,
  FETCH_OR_CREATE_RSVP_INITIATED,
  FETCH_OR_CREATE_RSVP_SUCCESS,
  UPDATE_RSVP_FAILURE,
  UPDATE_RSVP_REQUEST,
  UPDATE_RSVP_SUCCESS
} from './rsvpActions'
import { fetchRsvpByInviteAndUser, rsvpInvite, updateRsvp } from './rsvpClient'

interface IRsvpArgs {
  inviteId: string
  userId: string
  eventId: string
}

async function fetchRsvp({ inviteId, userId }: IRsvpArgs) {
  try {
    return await fetchRsvpByInviteAndUser(inviteId, userId)
  } catch (err) {
    // swallow the fetch error and return null
    return null
  }
}

async function createRsvp({ inviteId, userId, eventId }: IRsvpArgs) {
  return await rsvpInvite(inviteId, userId, eventId)
}

function* fetchOrCreateRsvpFlow({ payload }: IAction) {
  try {
    let rsvp = yield call(fetchRsvp, payload)
    if (!rsvp) {
      rsvp = createRsvp(payload)
    }
    yield put({ type: FETCH_OR_CREATE_RSVP_SUCCESS, payload: rsvp })
  } catch (err) {
    console.error(err)
    yield put({ type: FETCH_OR_CREATE_RSVP_FAILURE, payload: err })
  }
}

function* fetchUpdateRsvp({ payload }: IAction) {
  try {
    yield call(updateRsvp, payload)
    yield put({ type: UPDATE_RSVP_SUCCESS, payload})
  } catch (err) {
    yield put({ type: UPDATE_RSVP_FAILURE})
    console.log(err)
  }
}

export function* watchFetchUpdateRsvp() {
  yield takeEvery(UPDATE_RSVP_REQUEST, fetchUpdateRsvp)
}

export function* watchFetchOrCreateRsvp() {
  yield takeEvery(FETCH_OR_CREATE_RSVP_INITIATED, fetchOrCreateRsvpFlow)
}
