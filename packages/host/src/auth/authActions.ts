import IAction from '../IAction'
export const LOGGING_IN = 'LOGGING_IN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGGING_OUT = 'LOGGING_OUT'
export const LOGGED_OUT = 'LOGGED_OUT'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'

export const login = (): IAction => ({
  type: LOGGING_IN
})

export const loginSuccess = (): IAction => ({
  type: LOGIN_SUCCESS
})

export const loginFailure = (err: Error): IAction => ({
  payload: err,
  type: LOGIN_FAILURE
})

export const logout = (): IAction => ({
  type: LOGGING_OUT
})

export const clearAuthError = (): IAction => ({
  type: CLEAR_AUTH_ERROR
})
