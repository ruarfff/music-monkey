import { LOCATION_CHANGE } from 'connected-react-router'
import IAction from 'IAction'
import { EVENT_EDIT_FAILURE, EVENT_EDIT_SUCCESS } from 'event/eventActions'
import IEventSettings from 'event/IEventSettings'
import {
  EVENT_DELETE_CLOSED,
  EVENT_DELETE_FAILED,
  EVENT_DELETE_SELECTED,
  EVENT_DELETE_SUCCESSFUL,
  EVENT_FETCH_BY_ID_ERROR,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCHED_BY_ID,
  EVENT_INVITE_COPIED,
  EVENT_INVITE_COPY_ACKNOWLEDGED,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_DYNAMIC_VOTING_ERROR,
  TOGGLE_SUGGESTING_PLAYLISTS,
  TOGGLE_SUGGESTING_PLAYLISTS_ERROR
} from './eventViewActions'
import initialState from './eventViewInitialState'
import IEventViewState from './IEventViewState'

export default function eventView(
  state: IEventViewState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...initialState
      }
    case EVENT_EDIT_SUCCESS:
      return {
        ...state,
        editSuccess: true
      }
    case EVENT_EDIT_FAILURE:
      return {
        ...state,
        editFailure: true
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
    case EVENT_DELETE_SELECTED:
      return {
        ...state,
        deleteSelected: true
      }
    case EVENT_DELETE_CLOSED:
      return {
        ...state,
        deleteSelected: false,
        deleteFailed: false,
        deleteSucceeded: false
      }
    case EVENT_DELETE_SUCCESSFUL:
      return {
        ...state,
        deleteSucceeded: true
      }
    case EVENT_DELETE_FAILED:
      return {
        ...state,
        deleteFailed: true
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

function toggleSuggestPlaylists(state: IEventViewState) {
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

function toggleAutoAcceptSuggestions(state: IEventViewState) {
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

function toggleDynamicVoting(state: IEventViewState) {
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
