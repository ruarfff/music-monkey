import { LOCATION_CHANGE } from 'connected-react-router'
import {
  DESELECT_EVENT_PLAYLIST,
  SET_EVENT_PLAYLIST
} from './eventPlaylist/eventPlaylistActions'
import {
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_SUGGESTING_PLAYLISTS,
  EVENT_DELETE_SUCCESSFUL
} from './eventView/eventViewActions'
import Action from 'IAction'
import {
  CLEAR_MESSAGE,
  SHARE_EMAIL_FAILURE,
  SHARE_EMAIL_SUCCESS
} from './shareEvent/shareActions'
import {
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED
} from './eventActions'
import initialState from './eventInitialState'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
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
        : state.playlistInput
        ? state.playlistInput
        : payload.name
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          name: eventName
        },
        playlistReselected: true
      }
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          playlistUrl: ''
        }
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        shareEventMessage: ''
      }
    case SHARE_EMAIL_SUCCESS:
      return {
        ...state,
        shareEventMessage: payload.data
      }
    case SHARE_EMAIL_FAILURE:
      return {
        ...state,
        shareEventMessage: payload.data
      }
    case EVENT_FETCHED_BY_ID:
      return {
        ...state,
        savingEvent: payload
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        errors: {},
        createEventStep: 0,
        showSavedDialogue: false
      }
    case EVENT_DELETE_SUCCESSFUL:
      return {
        ...state,
        events: state.events.filter(item => item.eventId !== payload)
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
