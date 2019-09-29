import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_USER_SUCCESS } from 'user/userActions'
import {
  LOGGED_OUT,
  LOGGING_IN,
  LOGGING_OUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from './authActions'
import { loginWithCookie, logout } from './authClient'

export function* loginFlow() {
  try {
    const user = yield call(loginWithCookie)
    yield put({ type: LOGIN_SUCCESS })
    yield put({ type: FETCH_USER_SUCCESS, payload: user })
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error })
  }
}

export function* watchLogin() {
  yield takeEvery(LOGGING_IN, loginFlow)
}

export function* logoutFlow() {
  try {
    yield call(logout)
    yield put({ type: LOGGED_OUT })
  } catch (err) {
    console.error(err)
  }
}

export function* watchLogout() {
  yield takeEvery(LOGGING_OUT, logoutFlow)
}
