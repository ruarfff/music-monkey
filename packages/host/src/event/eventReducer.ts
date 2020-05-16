import { Action, arrayMove } from 'mm-shared'
import {
  EVENT_FETCHED_BY_ID,
  EVENT_DELETE_SUCCESSFUL,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  EVENT_FETCH_BY_ID_INITIATED,
  EVENT_FETCH_BY_ID_ERROR,
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING,
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
