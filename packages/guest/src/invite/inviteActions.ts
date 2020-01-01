import { Action } from 'mm-shared'
export const INVITE_EVENT_FETCH_ERROR = 'INVITE_EVENT_FETCH_ERROR'
export const FETCHING_INVITE = 'FETCHING_INVITE'
export const FETCHING_INVITE_SUCCESS = 'FETCHING_INVITE_SUCCESS'
export const FETCHING_INVITE_ERROR = 'FETCHING_INVITE_ERROR'

export const fetchInvite = (inviteId: string): Action => ({
  type: FETCHING_INVITE,
  payload: inviteId
})
