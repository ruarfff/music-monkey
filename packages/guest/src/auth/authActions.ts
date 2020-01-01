import { Action } from 'mm-shared'
export const LOGGING_IN_AS_GUEST = 'LOGGING_IN_AS_GUEST'
export const LOGGING_IN = 'LOGGING_IN'
export const LOGGING_IN_WITH_PASSWORD = 'LOGGING_IN_WITH_PASSWORD'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGGING_OUT = 'LOGGING_OUT'
export const LOGGED_OUT = 'LOGGED_OUT'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'
// Sign Up View Actions
export const SIGNING_UP = 'SIGNING_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const loginAsGuest = (): Action => ({
  type: LOGGING_IN_AS_GUEST
})

export const loginWithPassword = (
  email: string,
  password: string
): Action => ({
  payload: { email, password },
  type: LOGGING_IN_WITH_PASSWORD
})

export const login = (): Action => ({
  type: LOGGING_IN
})

export const loginSuccess = (): Action => ({
  type: LOGIN_SUCCESS
})

export const loginFailure = (err: Error): Action => ({
  payload: err,
  type: LOGIN_FAILURE
})

export const logout = (): Action => ({
  type: LOGGING_OUT
})

export const clearAuthError = (): Action => ({
  type: CLEAR_AUTH_ERROR
})

export const signUp = (email: string, password: string): Action => ({
  payload: { email, password },
  type: SIGNING_UP
})
