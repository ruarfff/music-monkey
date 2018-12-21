import { cloneDeep } from 'lodash'
import Action from '../IAction'
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
  GET_EVENT_HOST_SUCCESS,
} from './eventActions'
import initialState from './eventInitialState'
import IEvent from './IEvent'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case GET_EVENT_HOST_SUCCESS:
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          hostData: payload.data
        }
      }
    case DESELECT_EVENT:
      return {
        ...state,
        selectedEvent: {} as IEvent
      }
    case UPDATE_RSVP_SUCCESS:
      const updatedGuests = cloneDeep(state.selectedEvent.guests).map((guest) => {
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
    case EVENT_FETCHED:
      return {
        ...state,
        selectedEvent: payload,
        eventLoading: false
      } as IEventState
    case EVENT_CLEAR:
      return {
        ...state,
        selectedEvent: {} as IEvent,
        events: [],
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
        eventsLoading: true
      } as IEventState
    case FETCH_USERS_EVENTS_ERROR:
      return { eventsLoading: false } as IEventState
    case FETCH_USERS_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload,
        eventsLoading: false
      } as IEventState
    case EVENT_SELECTED:
      return {
        ...state,
        selectedEvent: payload
      }
    default:
      return state
  }
}
