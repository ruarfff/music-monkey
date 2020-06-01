import { Action } from 'mm-shared'
import {
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS
} from './playlistActions'
import initialState from './playlistInitialState'

export default function playlist(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false
      }
    case FETCH_PLAYLISTS_ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
