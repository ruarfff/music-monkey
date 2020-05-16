import { LOCATION_CHANGE } from 'connected-react-router'
import { Action } from 'mm-shared'
import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED
} from './playlistActions'
import initialState from './playlistInitialState'

export default function playlists(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        searchResult: {}
      }
    case FETCH_PLAYLISTS:
      return { ...state, isLoading: true }
    case FETCH_PLAYLISTS_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    case PLAYLIST_SELECTED:
      return { ...state, selectedPlaylist: payload }
    case PLAYLIST_DESELECTED:
      return { ...state, selectedPlaylist: {} }
    default:
      return state
  }
}
