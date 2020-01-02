import { Action, User } from 'mm-shared'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const fetchUser = (): Action => ({
  type: FETCH_USER
})

export const fetchUserSuccess = (data: User): Action => ({
  payload: data,
  type: FETCH_USER_SUCCESS
})

export const fetchUserError = (error: Error): Action => ({
  payload: error,
  type: FETCH_USER_ERROR
})

export const updateUserRequest = (data: User): Action => ({
  type: UPDATE_USER_REQUEST,
  payload: data
})
