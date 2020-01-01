import { LOCATION_CHANGE } from 'connected-react-router'
import { cloneDeep } from 'lodash'
import { Action } from 'mm-shared'
import {
  ADD_TRACK_FAILURE,
  ADD_TRACK_SUCCESS,
  CLEAR_JUST_CREATED_PLAYLISTS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  LOAD_MORE_PLAYLISTS_REQUEST,
  LOAD_MORE_PLAYLISTS_SUCCESS,
  PLAYLIST_DESELECTED,
  PLAYLIST_SELECTED,
  REMOVE_TRACK_FAILURE,
  REMOVE_TRACK_SUCCESS,
  SEARCH_TRACKS_FAILURE,
  SEARCH_TRACKS_SUCCESS,
  TRACK_FEATURES_FAILURE,
  TRACK_FEATURES_SUCCESS
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
    case CLEAR_JUST_CREATED_PLAYLISTS:
      return {
        ...state,
        createdPlaylists: []
      }
    case TRACK_FEATURES_SUCCESS:
      return {
        ...state,
        tracksWithFeatures: payload.audio_features
      }
    case TRACK_FEATURES_FAILURE:
      return state
    case REMOVE_TRACK_SUCCESS:
      return {
        ...state,
        notification: 'Track successfully removed'
      }
    case REMOVE_TRACK_FAILURE:
      return {
        ...state,
        notification: 'Error. Retry remove track later'
      }
    case ADD_TRACK_SUCCESS:
      return {
        ...state,
        notification: 'Track successfully added',
        searchResult: {}
      }
    case ADD_TRACK_FAILURE:
      return {
        ...state,
        notification: 'Error. Retry add track later'
      }
    case SEARCH_TRACKS_SUCCESS:
      return { ...state, searchResult: payload.tracks }
    case SEARCH_TRACKS_FAILURE:
      return state
    case LOAD_MORE_PLAYLISTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_MORE_PLAYLISTS_SUCCESS: {
      const playlists = cloneDeep(state.data).concat(payload)
      return {
        ...state,
        data: playlists,
        isLoading: false
      }
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
