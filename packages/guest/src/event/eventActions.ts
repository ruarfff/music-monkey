import IAction from '../IAction'
import ITrack from '../track/ITrack'
import IEvent from './IEvent'

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

export const GET_EVENT_HOST_REQUEST = 'GET_EVENT_HOST_REQUEST'
export const GET_EVENT_HOST_SUCCESS = 'GET_EVENT_HOST_SUCCESS'
export const GET_EVENT_HOST_FAILURE = 'GET_EVENT_HOST_FAILURE'

export const getEventHost = (userId: string): IAction => ({
  type: GET_EVENT_HOST_REQUEST,
  payload: userId
})

export const deselectEvent = (): IAction => ({
  type: DESELECT_EVENT
})

export const selectEvent = (event: IEvent): IAction => ({
  payload: event,
  type: EVENT_SELECTED
})

export const getEvent = (eventId: string): IAction => ({
  payload: eventId,
  type: EVENT_FETCH_INITIATED
})

export const selectSuggestion = (track: ITrack): IAction => ({
  payload: track,
  type: EVENT_SUGGESTION_SELECTED
})

export const deselectSuggestion = (): IAction => ({
  type: EVENT_SUGGESTION_DESELECTED
})

export const fetchUsersEvents = (): IAction => ({
  type: FETCH_USERS_EVENTS
})
