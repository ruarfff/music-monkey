import Action from '../IAction'
import IUser from './IUser'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const fetchUser = (): Action => ({
  type: FETCH_USER
})

export const fetchUserSuccess = (data: IUser): Action => ({
  payload: data,
  type: FETCH_USER_SUCCESS
})

export const fetchUserError = (error: Error): Action => ({
  payload: error,
  type: FETCH_USER_ERROR
})

export const updateUserRequest = (user: IUser): Action => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
})

export const updateUserSuccess = (user: IUser): Action => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFailure = (): Action => ({
  type: UPDATE_USER_FAILURE,
})
