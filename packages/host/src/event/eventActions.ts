import { Action, Event } from 'mm-shared'

export const DESELECT_EVENT = 'DESELECT_EVENT'
export const EVENT_SELECTED = 'EVENT_SELECTED'
export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'

export const EVENT_FETCH_BY_ID_INITIATED = 'EVENT_FETCH_BY_ID_INITIATED'
export const EVENT_FETCHED_BY_ID = 'EVENT_FETCHED_BY_ID'
export const EVENT_FETCH_BY_ID_ERROR = 'EVENT_FETCH_BY_ID_ERROR'

export const EVENT_DELETE_INITIATED = 'EVENT_DELETE_INITIATED'
export const EVENT_DELETE_SUCCESSFUL = 'EVENT_DELETE_SUCCESSFUL'

export const selectEvent = (event: Event): Action => ({
  payload: event,
  type: EVENT_SELECTED
})

export const deselectEvent = (): Action => ({
  type: DESELECT_EVENT
})

export const getEventById = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_BY_ID_INITIATED
})

export const deleteEvent = (eventId: string): Action => ({
  type: EVENT_DELETE_INITIATED,
  payload: eventId
})

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})
