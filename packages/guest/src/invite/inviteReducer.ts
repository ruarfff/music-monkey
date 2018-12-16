import IEvent from '../event/IEvent'
import Action from '../IAction'
import IInvite from './IInvite'
import IInviteState from './IInviteState'
import {
  CLEAR_INVITE_SUCCESS,
  FETCHING_INVITE,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED
} from './inviteActions'
import initialState from './inviteInitialState'

export default function invite(
  state = initialState,
  { type, payload }: Action
): IInviteState {
  switch (type) {
    case INVITE_ID_LOADED:
      return {
        ...state,
        inviteId: payload
      }
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
    case CLEAR_INVITE_SUCCESS: {
      return {
        ...state,
        inviteId: '',
        event: {} as IEvent
      }
    }
    default:
      return state
  }
}
