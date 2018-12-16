import IAction from "../IAction";

export const SEARCH_INITIATED = 'FETCH_SEARCH_INITIATED'
export const SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const SEARCH_FAILED = 'FETCH_SEARCH_FAILED'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const SEARCH_REMOVE_ADDED_TRACK = 'SEARCH_REMOVE_ADDED_TRACK'

export const searchTracks = (searchTerm: string) => ({
  type: SEARCH_INITIATED,
  payload: searchTerm
} as IAction)

export const removeTrack = (trackUri: string) => ({
  type: SEARCH_REMOVE_ADDED_TRACK,
  payload: trackUri
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
} as IAction)
