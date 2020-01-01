import { Action } from 'mm-shared'
export const LOGGING_IN = 'LOGGING_IN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGGING_OUT = 'LOGGING_OUT'
export const LOGGED_OUT = 'LOGGED_OUT'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'

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
