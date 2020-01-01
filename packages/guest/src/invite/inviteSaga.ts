import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import IInvite from './IInvite'
import {
  FETCHING_INVITE,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS
} from './inviteActions'
import { getInviteById } from './inviteClient'

function* fetchInviteFlow(action: Action) {
  try {
    const inviteId = action.payload
    const invite: IInvite = yield call(getInviteById, inviteId)
    yield put({ type: FETCHING_INVITE_SUCCESS, payload: invite })
  } catch (err) {
    yield put({ type: FETCHING_INVITE_ERROR, payload: err })
  }
}

export function* watchFetchInvite() {
  yield takeEvery(FETCHING_INVITE, fetchInviteFlow)
}
