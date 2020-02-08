import { Action } from 'mm-shared'

export const FETCH_REQUESTS_INITIATED = 'FETCH_REQUESTS_INITIATED'
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS'
export const FETCH_REQUESTS_FAILED = 'FETCH_REQUESTS_FAILED'

export const getRequestsByEventId = (eventId: string): Action => ({
  type: FETCH_REQUESTS_INITIATED,
  payload: eventId
})
