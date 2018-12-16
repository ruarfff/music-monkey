import Action from '../IAction'
import {
  CLEAR_AUTH_ERROR,
  LOGGED_OUT,
  LOGGING_IN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from './authActions'
import initialState from './authInitialState'
import IAuthState from './IAuthState'

export default function auth(
  state = initialState,
  { type, payload }: Action
): IAuthState {
  switch (type) {
    case LOGGING_IN:
      return { ...state, isAuthenticating: true }
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticating: false, isAuthenticated: true }
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
