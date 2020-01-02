import { Action, Rsvp } from 'mm-shared'

export const FETCH_OR_CREATE_RSVP_INITIATED = 'FETCH_OR_CREATE_RSVP_INITIATED'
export const FETCH_OR_CREATE_RSVP_SUCCESS = 'FETCH_OR_CREATE_RSVP_SUCCESS'
export const FETCH_OR_CREATE_RSVP_FAILURE = 'FETCH_OR_CREATE_RSVP_FAILURE'

export const UPDATE_RSVP_REQUEST = 'UPDATE_RSVP_REQUEST'
export const UPDATE_RSVP_SUCCESS = 'UPDATE_RSVP_SUCCESS'
export const UPDATE_RSVP_FAILURE = 'UPDATE_RSVP_FAILURE'

export const updateRsvp = (rsvp: Rsvp): Action => {
  return {
    type: UPDATE_RSVP_REQUEST,
    payload: rsvp
  }
}

export const fetchOrCreateRsvp = (
  inviteId: string,
  userId: string,
  eventId: string
): Action => ({
  type: FETCH_OR_CREATE_RSVP_INITIATED,
  payload: { inviteId, userId, eventId }
})
