import { Action } from 'mm-shared'
import {
  EVENT_FETCHED_BY_ID,
  EVENT_DELETE_SUCCESSFUL,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_SELECTED
} from './eventActions'
import initialState from './eventInitialState'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case EVENT_DELETE_SUCCESSFUL:
      return {
        ...state,
        events: state.events.filter((item) => item.eventId !== payload)
      }
    case EVENTS_FETCH_INITIATED:
      return {
        ...state,
        eventsLoading: true
      }
    case EVENTS_FETCHED:
      return {
        ...state,
        events: payload,
        eventsLoading: false
      }
    case EVENTS_FETCH_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchEvents: payload
        },
        eventsLoading: false
      }
    case EVENT_FETCH_BY_ID_INITIATED:
      return {
        ...state,
        fetchError: {}
      }
    case EVENT_FETCHED_BY_ID:
      return {
        ...state,
        event: payload
      }
    case EVENT_FETCH_BY_ID_ERROR:
      return {
        ...state,
        fetchError: payload
      }
    case EVENT_SELECTED: {
      return {
        ...state,
        event: payload
      }
    }
    default:
      return state
  }
}
