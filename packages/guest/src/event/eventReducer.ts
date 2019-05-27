import { cloneDeep } from 'lodash'
import Action from '../IAction'
import moment from 'moment'
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
import { sortBy } from 'lodash'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case DESELECT_EVENT:
      return {
        ...state,
        selectedEvent: {} as IEvent
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
    case EVENT_FETCHED:
      return {
        ...state,
        selectedEvent: payload,
        eventId: payload.eventId,
        eventLoading: false
      } as IEventState
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
      const events: IEvent[] = sortBy(payload || [], 'endDateTime').reverse()
      const now = moment()
      return {
        ...state,
        events,
        eventsLoading: false,
        pastEvents: sortBy(
          events.filter(event => now.isAfter(event.endDateTime)),
          'endDateTime'
        ).reverse(),
        liveEvents: sortBy(
          events.filter(
            event =>
              now.isAfter(event.startDateTime) &&
              now.isBefore(event.endDateTime)
          ),
          'endDateTime'
        ).reverse(),
        upcomingEvents: sortBy(
          events.filter(event => now.isBefore(event.startDateTime)),
          'endDateTime'
        ).reverse()
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
