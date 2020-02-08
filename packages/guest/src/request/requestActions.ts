import { Action, TrackRequest, PlaylistRequest } from 'mm-shared'

export const SAVE_TRACK_SUGGESTION_INITIATED = 'SAVE_TRACK_SUGGESTION_INITIATED'
export const SAVE_PLAYLIST_SUGGESTION_INITIATED =
  'SAVE_PLAYLIST_SUGGESTION_INITIATED'
export const SAVE_SUGGESTION_SUCCESS = 'SAVE_SUGGESTION_SUCCESS'
export const SAVE_SUGGESTION_FAILED = 'SAVE_SUGGESTION_FAILED'
export const FETCH_SUGGESTIONS_INITIATED = 'FETCH_SUGGESTIONS_INITIATED'
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS'
export const FETCH_SUGGESTIONS_FAILED = 'FETCH_SUGGESTIONS_FAILED'

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
