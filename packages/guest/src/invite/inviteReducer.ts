import { Action } from 'mm-shared'
import IInvite from './IInvite'
import IInviteState from './IInviteState'
import {
  FETCHING_INVITE,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS
} from './inviteActions'
import initialState from './inviteInitialState'

export default function invite(
  state = initialState,
  { type, payload }: Action
): IInviteState {
  switch (type) {
    case FETCHING_INVITE:
      return {
        ...state,
        loading: true
      }
    case FETCHING_INVITE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case FETCHING_INVITE_SUCCESS: {
      const { inviteId, event } = payload || ({} as IInvite)
      return {
        ...state,
        inviteId,
        event,
        loading: false
      }
    }
    default:
      return state
  }
}
