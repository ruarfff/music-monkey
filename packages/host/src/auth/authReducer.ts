import { Action } from 'mm-shared'
import {
  CLEAR_AUTH_ERROR,
  LOGGED_OUT,
  LOGGING_IN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGNING_UP
} from './authActions'
import initialState from './authInitialState'
import IAuthState from './IAuthState'

export default function auth(
  state = initialState,
  { type, payload }: Action
): IAuthState {
  switch (type) {
    case SIGNING_UP:
    case LOGGING_IN:
      return { ...state, isAuthenticating: true }
    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        firstAuthenticated: false
      }
    case SIGN_UP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isAuthenticating: false, authError: payload }
    case LOGGED_OUT:
      return { ...state, isAuthenticated: false }
    case CLEAR_AUTH_ERROR:
      return { ...state, authError: undefined }
    default:
      return state
  }
}
