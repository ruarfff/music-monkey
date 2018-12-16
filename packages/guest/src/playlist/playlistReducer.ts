import IEvent from '../event/IEvent'
import Action from '../IAction'
import { SELECT_PLAYLIST } from '../navigation/activeActions'
import {
  EVENT_PLAYLISTS_LOADED,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_CLEAR,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED
} from './playlistActions'
import initialState from './playlistInitialState'

export default function playlist(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SELECT_PLAYLIST:
      return { ...state, selectedPlaylist: payload}
    case FETCH_PLAYLISTS:
      return { ...state, isLoading: true }
    case FETCH_PLAYLISTS_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case PLAYLIST_CLEAR:
      return { ...state, data: [], selectedPlaylist: {}, isLoading: false }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    case PLAYLIST_SELECTED:
      return { ...state, selectedPlaylist: payload }
    case PLAYLIST_DESELECTED:
      return { ...state, selectedPlaylist: {} }
    case EVENT_PLAYLISTS_LOADED:
      return {
        ...state,
        eventPlaylists: payload.map((event: IEvent) => ({
          ...event.playlist,
          eventId: event.eventId
        }))
      }
    default:
      return state
  }
}
