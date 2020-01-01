import { cloneDeep } from 'lodash'
import IEvent from '../event/IEvent'
import { Action } from 'mm-shared'
import {
  EVENT_PLAYLISTS_LOADED,
  FETCH_MORE_PLAYLISTS_REQUEST,
  FETCH_MORE_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_CLEAR
} from './playlistActions'
import initialState from './playlistInitialState'

export default function playlist(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_MORE_PLAYLISTS_REQUEST:
    case FETCH_PLAYLISTS:
      return { ...state, isLoading: true }
    case FETCH_MORE_PLAYLISTS_SUCCESS:
      const newData = cloneDeep(state.data).concat(payload)
      return {
        ...state,
        data: newData,
        isLoading: false,
        offset: state.offset + 50
      }
    case FETCH_PLAYLISTS_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case PLAYLIST_CLEAR:
      return { ...state, data: [], isLoading: false }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    case EVENT_PLAYLISTS_LOADED:
      const filteredEvents = payload.filter(
        (event: IEvent) => event.playlistUrl
      )
      return {
        ...state,
        eventPlaylists: filteredEvents.map((event: IEvent) => ({
          ...event.playlist,
          eventId: event.eventId
        }))
      }
    default:
      return state
  }
}
