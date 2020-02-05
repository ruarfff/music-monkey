import { Action, Suggestion, TrackRequest, PlaylistRequest } from 'mm-shared'

export const SAVE_TRACK_SUGGESTION_INITIATED = 'SAVE_TRACK_SUGGESTION_INITIATED'
export const SAVE_PLAYLIST_SUGGESTION_INITIATED =
  'SAVE_PLAYLIST_SUGGESTION_INITIATED'
export const SAVE_SUGGESTION_SUCCESS = 'SAVE_SUGGESTION_SUCCESS'
export const SAVE_SUGGESTION_FAILED = 'SAVE_SUGGESTION_FAILED'
export const FETCH_SUGGESTIONS_INITIATED = 'FETCH_SUGGESTIONS_INITIATED'
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS'
export const FETCH_SUGGESTIONS_FAILED = 'FETCH_SUGGESTIONS_FAILED'
export const DELETE_SUGGESTION_INITIATED = 'DELETE_SUGGESTION_INITIATED'
export const DELETE_SUGGESTION_SUCCESS = 'DELETE_SUGGESTION_SUCCESS'
export const DELETE_SUGGESTION_FAILED = 'DELETE_SUGGESTION_FAILED'
export const CLEAR_SAVED_SUGGESTION = 'CLEAR_SAVED_SUGGESTION'
export const CLEAR_SUGGESTION = 'CLEAR_SUGGESTION'

export const saveTrackRequest = (request: TrackRequest): Action => ({
  type: SAVE_TRACK_SUGGESTION_INITIATED,
  payload: request
})

export const savePlaylistRequest = (request: PlaylistRequest): Action => ({
  type: SAVE_PLAYLIST_SUGGESTION_INITIATED,
  payload: request
})

export const getRequestsByEventId = (eventId: string): Action => ({
  type: FETCH_SUGGESTIONS_INITIATED,
  payload: eventId
})

export const clearSavedSuggestion = (): Action => ({
  type: CLEAR_SAVED_SUGGESTION
})

export const clearSuggestion = (): Action => ({
  type: CLEAR_SUGGESTION
})

export const deleteSuggestion = (suggestion: Suggestion): Action => ({
  type: DELETE_SUGGESTION_INITIATED,
  payload: suggestion
})
