import { Action, Suggestion } from 'mm-shared'

export const FETCH_REQUESTS_INITIATED = 'FETCH_REQUESTS_INITIATED'
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS'
export const FETCH_REQUESTS_FAILED = 'FETCH_REQUESTS_FAILED'

export const REJECT_REQUEST = 'REJECT_REQUEST'
export const REJECT_REQUEST_SUCCESS = 'REJECT_REQUEST_SUCCESS'
export const REJECT_REQUEST_FAILED = 'REJECT_REQUEST_FAILED'

export const getRequestsByEventId = (eventId: string): Action => ({
  type: FETCH_REQUESTS_INITIATED,
  payload: eventId
})

export const rejectRequest = (request: Suggestion): Action => ({
  type: REJECT_REQUEST,
  payload: request
})
