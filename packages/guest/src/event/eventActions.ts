import { Action, Track, Event } from 'mm-shared'

export const DESELECT_EVENT = 'DESELECT_EVENT'
export const EVENT_SELECTED = 'EVENT_SELECTED'
export const EVENT_FETCH_INITIATED = 'EVENT_FETCH_INITIATED'
export const EVENT_FETCHED = 'EVENT_FETCHED'
export const EVENT_CLEAR = 'EVENT_CLEAR'
export const EVENT_FETCH_ERROR = 'EVENT_FETCH_ERROR'
export const EVENT_FETCH_BY_INVITE_ID_INITIATED =
  'EVENT_FETCH_BY_INVITE_ID_INITIATED'
export const EVENT_SUGGESTION_SELECTED = 'EVENT_SUGGESTION_SELECTED'
export const EVENT_SUGGESTION_DESELECTED = 'EVENT_SUGGESTION_DESELECTED'

export const FETCH_USERS_EVENTS = 'FETCH_USERS_EVENTS'
export const FETCH_USERS_EVENTS_SUCCESS = 'FETCH_USERS_EVENTS_SUCCESS'
export const FETCH_USERS_EVENTS_ERROR = 'FETCH_USERS_EVENTS_ERROR'

export const EVENT_ID_SET = 'EVENT_ID_SET'

export const setEventId = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_ID_SET
})

export const selectEvent = (event: Event): Action => ({
  payload: event,
  type: EVENT_SELECTED
})

export const deselectEvent = (): Action => ({
  type: DESELECT_EVENT
})

export const getEvent = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_INITIATED
})

export const selectSuggestion = (track: Track): Action => ({
  payload: track,
  type: EVENT_SUGGESTION_SELECTED
})

export const deselectSuggestion = (): Action => ({
  type: EVENT_SUGGESTION_DESELECTED
})

export const fetchUsersEvents = (): Action => ({
  type: FETCH_USERS_EVENTS
})
