import IAction from '../IAction'
export const STORING_INVITE_ID = 'STORING_INVITE_ID'
export const INVITE_ID_STORED = 'INVITE_ID_STORED'
export const INVITE_ID_STORE_ERROR = 'INVITE_ID_STORE_ERROR'
export const LOADING_INVITE_ID = 'LOADING_INVITE_ID'
export const INVITE_ID_LOADED = 'INVITE_ID_LOADED'
export const CLEAR_INVITE = 'CLEAR_INVITE'
export const CLEAR_INVITE_SUCCESS = 'CLEAR_INVITE_SUCCESS'
export const CLEAR_INVITE_ERROR = 'CLEAR_INVITE_ERROR'
export const INVITE_EVENT_FETCH_ERROR = 'INVITE_EVENT_FETCH_ERROR'
export const FETCHING_INVITE = 'FETCHING_INVITE'
export const FETCHING_INVITE_SUCCESS = 'FETCHING_INVITE_SUCCESS'
export const FETCHING_INVITE_ERROR = 'FETCHING_INVITE_ERROR'

export const clearInvite = (): IAction => ({
  type: CLEAR_INVITE
})

export const storeInviteId = (inviteId: string): IAction => ({
  type: STORING_INVITE_ID,
  payload: inviteId
})

export const loadInviteId = (): IAction => ({
  type: LOADING_INVITE_ID
})

export const fetchInvite = (inviteId: string): IAction => ({
  type: FETCHING_INVITE,
  payload: inviteId
})
