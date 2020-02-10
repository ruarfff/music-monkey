import { Action, Track } from 'mm-shared'
export const ADD_USERS_LIKED_TRACKS = 'ADD_USERS_LIKED_TRACKS'

export const addLikedTracks = (tracks: Track[]): Action => ({
  payload: tracks,
  type: ADD_USERS_LIKED_TRACKS
})
