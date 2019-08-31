import { LOCATION_CHANGE } from 'connected-react-router'
import {
  DESELECT_EVENT_PLAYLIST,
  SET_EVENT_PLAYLIST
} from '../eventPlaylist/eventPlaylistActions'
import {
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_SUGGESTING_PLAYLISTS
} from '../eventView/eventViewActions'
import Action from '../IAction'
import {
  CLEAR_SAVING_EVENT,
  EVENT_CREATE_FORM_INITIALIZED,
  EVENT_EDIT_FAILURE,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_IMAGE_UPLOAD_ERROR,
  EVENT_IMAGE_UPLOADED,
  EVENT_LOCATION_CHANGED,
  EVENT_LOCATION_ERROR,
  EVENT_LOCATION_POPULATED,
  EVENT_SAVE_ERROR,
  EVENT_SAVED,
  EVENT_SAVING_RESET,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED
} from './eventActions'
import initialState from './eventInitialState'
import IEvent from './IEvent'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
): IEventState {
  switch (type) {
    case CLEAR_SAVING_EVENT:
      return {
        ...state,
        savingEvent: {
          ...initialState.savingEvent,
          organizer: state.savingEvent.organizer
        } as IEvent
      }
    case TOGGLE_AUTO_ACCEPT_SUGGESTIONS:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            autoAcceptSuggestionsEnabled: !state.savingEvent.settings
              .autoAcceptSuggestionsEnabled
          } as IEventSettings
        }
      }
    case TOGGLE_DYNAMIC_VOTING:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            dynamicVotingEnabled: !state.savingEvent.settings
              .dynamicVotingEnabled
          } as IEventSettings
        }
      }
    case TOGGLE_SUGGESTING_PLAYLISTS:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            suggestingPlaylistsEnabled: !state.savingEvent.settings
              .suggestingPlaylistsEnabled
          } as IEventSettings
        }
      }
    case SET_EVENT_PLAYLIST:
      const eventName = state.savingEvent.name
        ? state.savingEvent.name
        : payload.name
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          name: eventName
        }
      }
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          playlistUrl: ''
        }
      }
    case EVENT_EDIT_REQUEST:
      return state

    case EVENT_EDIT_FAILURE:
      return state

    case EVENT_EDIT_SUCCESS:
      return {
        ...state,
        savingEvent: payload
      }

    case EVENT_FETCHED_BY_ID:
      return {
        ...state,
        savingEvent: payload
      }

    case EVENT_LOCATION_CHANGED:
      return {
        ...state,
        errors: { ...state.errors, location: undefined },
        savingEvent: {
          ...state.savingEvent,
          location: { ...state.savingEvent.location, address: payload }
        }
      }
    case EVENT_LOCATION_POPULATED:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          location: { ...state.savingEvent.location, ...payload }
        }
      }
    case EVENT_LOCATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          location: payload
        }
      }
    case EVENT_IMAGE_UPLOADED:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          imageUrl: payload.imgUrl,
          dataUrl: payload.dataUrl
        }
      }
    case EVENT_IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          imageUpload: payload
        }
      }
    case EVENT_SAVING_RESET:
      return {
        ...state,
        savingEvent: {
          ...initialState.savingEvent
        }
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        errors: {}
      }
    case EVENT_SAVED:
      return {
        ...state,
        events: [...state.events, payload],
        savingEvent: payload
      }
    case EVENT_SAVE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          saving: payload
        }
      }
    case EVENT_CREATE_FORM_INITIALIZED:
      return {
        ...state,
        savingEvent: {
          ...payload.event,
          organizer: payload.user.displayName,
          userId: payload.user.userId
        }
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
    default:
      return state
  }
}
