import { LOCATION_CHANGE } from 'connected-react-router'
import { cloneDeep } from 'lodash'
import { Action } from 'mm-shared'
import ISearchState from './ISearchState'
import {
  CLEAR_SEARCH,
  SEARCH_FAILED,
  SEARCH_INITIATED,
  SEARCH_REMOVE_ADDED_TRACK,
  SEARCH_SUCCESS
} from './searchActions'
import initialState from './searchInitialState'

export default function search(
  state: ISearchState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case LOCATION_CHANGE:
      return { ...state, tracks: [] }
    case SEARCH_REMOVE_ADDED_TRACK:
      const filteredTracks =
        cloneDeep(state.tracks
          .filter((track) => track.uri !== payload))
      return {
        ...state,
        tracks: filteredTracks
      }
    case SEARCH_INITIATED:
      return { ...state, searching: true }
    case SEARCH_SUCCESS:
      return { ...state, tracks: payload, searching: false }
    case CLEAR_SEARCH:
      return { ...state, tracks: [] }
      case SEARCH_FAILED:
      return { ...state, searching: false }
    default:
      return state
  }
}
