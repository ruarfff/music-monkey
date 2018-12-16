import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import IAction from '../IAction'
import localStorage from '../storage/localStorage'
import IInvite from './IInvite'
import {
  CLEAR_INVITE,
  CLEAR_INVITE_ERROR,
  CLEAR_INVITE_SUCCESS,
  FETCHING_INVITE,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED,
  INVITE_ID_STORE_ERROR,
  INVITE_ID_STORED,
  LOADING_INVITE_ID,
  STORING_INVITE_ID
} from './inviteActions'
import { getInviteById } from './inviteClient'
import { inviteIdKey } from './inviteConstants'

function storeInviteId(inviteId: string): void {
  if (inviteId) {
    localStorage.set(inviteIdKey, inviteId)
  }
}

function* storeInviteIdFlow(action: IAction) {
  try {
    yield call(storeInviteId, action.payload)
    yield put({ type: INVITE_ID_STORED, payload: action.payload })
  } catch (error) {
    yield put({ type: INVITE_ID_STORE_ERROR, payload: error })
  }
}

export function* watchStoreInviteId() {
  yield takeEvery(STORING_INVITE_ID, storeInviteIdFlow)
}

function loadInviteId(): string {
  return localStorage.get(inviteIdKey)
}

function* loadInviteIdFlow() {
  try {
    const inviteId: string = yield call(loadInviteId)
    yield put({ type: INVITE_ID_LOADED, payload: inviteId })
  } catch (error) {
    console.error(error)
  }
}

export function* watchLoadInviteId() {
  yield takeEvery(LOADING_INVITE_ID, loadInviteIdFlow)
}

function* fetchInviteFlow(action: IAction) {
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

function* clearInviteFlow() {
  try {
    localStorage.clear()
    yield put({ type: CLEAR_INVITE_SUCCESS })
  } catch (err) {
    yield put({ type: CLEAR_INVITE_ERROR, payload: err })
  }
}

export function* watchClearInvite() {
  yield takeLatest(CLEAR_INVITE, clearInviteFlow)
}
