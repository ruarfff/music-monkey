import { LOCATION_CHANGE } from 'connected-react-router'
import Action from 'IAction'
import {
  CLEAR_MESSAGE,
  SHARE_EMAIL_FAILURE,
  SHARE_EMAIL_SUCCESS
} from './shareEvent/shareActions'
import {
  DESELECT_EVENT_PLAYLIST,
  SET_EVENT_PLAYLIST,
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
  TOGGLE_SUGGESTING_PLAYLISTS_ERROR,
  UPDATE_PLAYLIST_AFTER_COPY,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_SUCCESS,
  SAVE_EVENT_PLAYLIST_ERROR,
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING
} from './eventActions'
import initialState from './eventInitialState'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'
import IPlaylist from 'playlist/IPlaylist'
import {
  ADD_TRACK_SUCCESS,
  REMOVE_TRACK_SUCCESS
} from 'playlist/playlistActions'
import { cloneDeep } from 'lodash'
import arrayMove from 'util/arrayMove'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SET_EVENT_PLAYLIST:
      return {
        ...state,
        playlist: payload
      }
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        playlist: {} as IPlaylist
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
    case UPDATE_PLAYLIST_AFTER_COPY:
      return {
        ...state,
        event: {
          ...state.event,
          playlist: {
            ...state.event.playlist,
            id: payload.id,
            uri: payload.uri,
            name: payload.name,
            external_urls: payload.external_urls,
            href: payload.href
          }
        }
      }
    case ADD_TRACK_SUCCESS:
      const newPlaylist = cloneDeep(state.event.playlist!)
      newPlaylist.tracks.items.unshift({
        added_at: `${Date.now()}`,
        track: payload
      })
      return {
        ...state,
        event: {
          ...state.event,
          playlist: newPlaylist
        }
      }
    case SAVE_EVENT_PLAYLIST:
      return { ...state, savingEventPlaylist: true }
    case SAVE_EVENT_PLAYLIST_SUCCESS:
      return { ...state, savingEventPlaylist: false }
    case SAVE_EVENT_PLAYLIST_ERROR:
      return {
        ...state,
        savingEventPlaylist: false,
        saveEventPlaylistError: payload
      }
    case REMOVE_TRACK_SUCCESS:
      return {
        ...state,
        playlist: payload
      }
    case MOVE_ITEM_IN_EVENT_PLAYLIST: {
      try {
        const { fromIndex, toIndex } = payload
        const playlist = { ...payload.playlist }
        const playlistItems = [...playlist.tracks.items]
        arrayMove(playlistItems, fromIndex, toIndex)
        return {
          ...state,
          event: {
            ...state.event,
            playlist: {
              ...playlist,
              tracks: { ...playlist.tracks, items: playlistItems }
            }
          }
        }
      } catch (err) {
        console.error(err)
        return state
      }
    }
    case PLAYLIST_SORTED_BY_VOTES_DESCENDING: {
      return {
        ...state,
        playlist: payload
      }
    }
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
