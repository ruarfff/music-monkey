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
import auth from './authReducer'

describe('authReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(auth(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle LOGGING_IN', () => {
    expect(auth(initialState, { type: LOGGING_IN })).toEqual({
      ...initialState,
      isAuthenticating: true
    })
  })

  it('should handle SIGNING_UP', () => {
    expect(auth(initialState, { type: SIGNING_UP })).toEqual({
      ...initialState,
      isAuthenticating: true
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth(initialState, {
        type: LOGIN_SUCCESS
      })
    ).toEqual({
      ...initialState,
      isAuthenticating: false,
      isAuthenticated: true,
      firstAuthenticated: false
    })
  })

  it('should handle SIGN_UP_SUCCESS', () => {
    expect(
      auth(initialState, {
        type: SIGN_UP_SUCCESS
      })
    ).toEqual({
      ...initialState,
      isAuthenticating: false,
      isAuthenticated: true,
      firstAuthenticated: false
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    expect(
      auth(initialState, {
        type: LOGIN_FAILURE,
        payload: new Error('oops')
      })
    ).toEqual({
      ...initialState,
      authError: new Error('oops'),
      isAuthenticating: false
    })
  })

  it('should handle SIGN_UP_FAILURE', () => {
    expect(
      auth(initialState, {
        type: SIGN_UP_FAILURE,
        payload: new Error('oops')
      })
    ).toEqual({
      ...initialState,
      authError: new Error('oops'),
      isAuthenticating: false
    })
  })

  it('should handle LOGGED_OUT', () => {
    expect(
      auth(
        { ...initialState, isAuthenticated: true },
        {
          type: LOGGED_OUT
        }
      )
    ).toEqual({
      ...initialState,
      isAuthenticated: false
    })
  })

  it('should handle CLEAR_AUTH_ERROR', () => {
    expect(
      auth(
        { ...initialState, authError: 'test' },
        {
          type: CLEAR_AUTH_ERROR
        }
      )
    ).toEqual({
      ...initialState,
      authError: undefined
    })
  })
})
