import { LOCATION_CHANGE } from 'connected-react-router'
import {
  DESELECT_EVENT_PLAYLIST,
  SET_EVENT_PLAYLIST
} from './eventPlaylist/eventPlaylistActions'
import Action from 'IAction'
import {
  CLEAR_MESSAGE,
  SHARE_EMAIL_FAILURE,
  SHARE_EMAIL_SUCCESS
} from './shareEvent/shareActions'
import {
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_SUGGESTING_PLAYLISTS,
  EVENT_DELETE_SUCCESSFUL,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_INVITE_COPIED,
  EVENT_INVITE_COPY_ACKNOWLEDGED,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS_ERROR
} from './eventActions'
import initialState from './eventInitialState'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SET_EVENT_PLAYLIST:
      const eventName = state.event.name
        ? state.event.name
        : state.playlistInput
        ? state.playlistInput
        : payload.name
      return {
        ...state,
        event: {
          ...state.event,
          name: eventName
        },
        playlistReselected: true
      }
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        event: {
          ...state.event,
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
    case EVENT_FETCH_BY_ID_INITIATED:
      return {
        ...state,
        fetchError: {},
        loading: true
      }
    case EVENT_FETCHED_BY_ID:
      return {
        ...state,
        event: payload,
        loading: false
      }
    case EVENT_FETCH_BY_ID_ERROR:
      return {
        ...state,
        fetchError: payload,
        loading: false
      }
    case EVENT_INVITE_COPIED:
      return {
        ...state,
        copiedToClipboard: true
      }
    case EVENT_INVITE_COPY_ACKNOWLEDGED:
      return {
        ...state,
        copiedToClipboard: false
      }
    case TOGGLE_DYNAMIC_VOTING:
      return toggleDynamicVoting(state)
    case TOGGLE_DYNAMIC_VOTING_ERROR:
      return toggleDynamicVoting(state)
    case TOGGLE_AUTO_ACCEPT_SUGGESTIONS:
      return toggleAutoAcceptSuggestions(state)
    case TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR:
      return toggleAutoAcceptSuggestions(state)
    case TOGGLE_SUGGESTING_PLAYLISTS:
      return toggleSuggestPlaylists(state)
    case TOGGLE_SUGGESTING_PLAYLISTS_ERROR:
      return toggleSuggestPlaylists(state)
    default:
      return state
  }
}

function toggleSuggestPlaylists(state: IEventState) {
  const { event } = state
  if (event) {
    return {
      ...state,
      event: {
        ...event,
        settings: {
          ...event.settings,
          suggestingPlaylistsEnabled: !event.settings.suggestingPlaylistsEnabled
        } as IEventSettings
      }
    }
  } else {
    return state
  }
}

function toggleAutoAcceptSuggestions(state: IEventState) {
  const { event } = state
  if (event) {
    return {
      ...state,
      event: {
        ...event,
        settings: {
          ...event.settings,
          autoAcceptSuggestionsEnabled: !event.settings
            .autoAcceptSuggestionsEnabled
        } as IEventSettings
      }
    }
  } else {
    return state
  }
}

function toggleDynamicVoting(state: IEventState) {
  const { event } = state
  if (event) {
    return {
      ...state,
      event: {
        ...event,
        settings: {
          ...event.settings,
          dynamicVotingEnabled: !event.settings.dynamicVotingEnabled
        } as IEventSettings
      }
    }
  } else {
    return state
  }
}
