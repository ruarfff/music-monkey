import Action from '../IAction'
import {
  FETCH_OR_CREATE_RSVP_INITIATED,
  FETCH_OR_CREATE_RSVP_SUCCESS,
  FETCH_OR_CREATE_RSVP_FAILURE
} from './rsvpActions'

export default function rsvp(state = {}, { type, payload }: Action) {
  switch (type) {
    case FETCH_OR_CREATE_RSVP_INITIATED:
      return {
        ...state,
        fetchingRsvp: true
      }
    case FETCH_OR_CREATE_RSVP_SUCCESS:
      return {
        ...state,
        fetchingRsvp: false
      }
    case FETCH_OR_CREATE_RSVP_FAILURE:
      return {
        ...state,
        fetchingRsvp: false
      }
    default:
      return state
  }
}
