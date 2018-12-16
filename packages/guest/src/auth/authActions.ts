import IAction from '../IAction'
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

export const loginAsGuest = (): IAction => ({
  type: LOGGING_IN_AS_GUEST
})

export const loginWithPassword = (
  email: string,
  password: string
): IAction => ({
  payload: { email, password },
  type: LOGGING_IN_WITH_PASSWORD
})

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

export const signUp = (email: string, password: string): IAction => ({
  payload: { email, password },
  type: SIGNING_UP
})
