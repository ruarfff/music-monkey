import { Action } from 'mm-shared'
import {
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
    case FETCH_PLAYLISTS_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    case PLAYLIST_CLEAR:
      return { ...state, data: [], isLoading: false }
    default:
      return state
  }
}
