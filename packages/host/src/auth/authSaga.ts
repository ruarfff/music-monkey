import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import { FETCH_USER_SUCCESS } from 'user/userActions'
import {
  LOGGED_OUT,
  LOGGING_IN,
  LOGGING_IN_AS_GUEST,
  LOGGING_IN_WITH_PASSWORD,
  LOGGING_OUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGNING_UP
} from './authActions'
import {
  loginAsGuest,
  loginWithCookie,
  loginWithCredentials,
  logout,
  signUp
} from './authClient'

const defaultErrorMessage = 'An unexpected error occurred.'

export function* loginFlow() {
  try {
    const user = yield call(loginWithCookie)
    yield put({ type: LOGIN_SUCCESS })
    yield put({ type: FETCH_USER_SUCCESS, payload: user })
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: formatError(error, 'verify') })
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

export function* signUpFlow(action: Action) {
  try {
    yield call(signUp, action.payload)
    yield put({ type: SIGN_UP_SUCCESS })
    yield loginFlow()
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, payload: formatError(error, 'signUp') })
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGNING_UP, signUpFlow)
}

export function* loginWithPasswordFlow(action: Action) {
  try {
    yield call(loginWithCredentials, action.payload)
    yield loginFlow()
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: formatError(error, 'login') })
  }
}

export function* watchLoginWithPassword() {
  yield takeEvery(LOGGING_IN_WITH_PASSWORD, loginWithPasswordFlow)
}

export function* loginAsGuestFlow() {
  try {
    yield call(loginAsGuest)
    yield loginFlow()
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: formatError(error, 'guest-login')
    })
  }
}

export function* watchLoginAsGuest() {
  yield takeEvery(LOGGING_IN_AS_GUEST, loginAsGuestFlow)
}

function formatError(error: any, context: string) {
  if (error) {
    error.errorContext = context
    if (error.response && error.response.status === 404) {
      error = { ...error, response: { data: defaultErrorMessage } }
    }
  }
  return error
}
