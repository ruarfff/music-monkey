import { cloneDeep, findIndex } from 'lodash'
import { Action } from 'mm-shared'
import { UPDATE_RSVP_SUCCESS } from '../rsvp/rsvpActions'
import {
  DESELECT_EVENT,
  EVENT_CLEAR,
  EVENT_FETCH_BY_INVITE_ID_INITIATED,
  EVENT_FETCH_ERROR,
  EVENT_FETCH_INITIATED,
  EVENT_FETCHED,
  EVENT_SELECTED,
  EVENT_SUGGESTION_DESELECTED,
  EVENT_SUGGESTION_SELECTED,
  FETCH_USERS_EVENTS,
  FETCH_USERS_EVENTS_ERROR,
  FETCH_USERS_EVENTS_SUCCESS,
  EVENT_ID_SET
} from './eventActions'
import initialState from './eventInitialState'
import IEvent from './IEvent'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case DESELECT_EVENT:
      return {
        ...state,
        selectedEvent: {} as IEvent,
        eventId: null
      }
    case UPDATE_RSVP_SUCCESS:
      const updatedGuests = cloneDeep(state.selectedEvent.guests).map(guest => {
        if (payload.userId === guest.user.userId) {
          guest.rsvp.status = payload.status
        }
        return guest
      })

      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          guests: updatedGuests
        }
      }
    case EVENT_FETCH_INITIATED || EVENT_FETCH_BY_INVITE_ID_INITIATED:
      return {
        ...state,
        eventLoading: true
      } as IEventState
    case EVENT_FETCHED: {
      let existingEvents = [...state.events]
      const existingIndex = findIndex(
        existingEvents,
        event => event.eventId === payload.eventId
      )
      if (existingIndex > -1) {
        existingEvents[existingIndex] = payload
      } else {
        existingEvents = [...existingEvents, payload]
      }
      return {
        ...state,
        selectedEvent: payload,
        eventId: payload.eventId,
        eventLoading: false,
        events: existingEvents
      } as IEventState
    }
    case EVENT_CLEAR:
      return {
        ...state,
        selectedEvent: {} as IEvent,
        events: [],
        pastEvents: [],
        upcomingEvents: [],
        liveEvents: [],
        eventLoading: false
      } as IEventState
    case EVENT_FETCH_ERROR:
      return {
        ...state,
        fetchEventError: payload,
        eventLoading: false
      } as IEventState
    case EVENT_SUGGESTION_SELECTED:
      return {
        ...state,
        selectedSuggestion: payload
      } as IEventState
    case EVENT_SUGGESTION_DESELECTED:
      return {
        ...state,
        selectedSuggestion: undefined
      } as IEventState
    case FETCH_USERS_EVENTS:
      return {
        ...state,
        eventsLoading: true
      } as IEventState
    case FETCH_USERS_EVENTS_ERROR:
      return { ...state, eventsLoading: false } as IEventState
    case FETCH_USERS_EVENTS_SUCCESS: {
      const events: IEvent[] = payload
      return {
        ...state,
        events,
        eventsLoading: false
      } as IEventState
    }
    case EVENT_SELECTED:
      return {
        ...state,
        selectedEvent: payload,
        eventId: payload.eventId
      }
    case EVENT_ID_SET:
      return {
        ...state,
        eventId: payload
      }
    default:
      return state
  }
}
