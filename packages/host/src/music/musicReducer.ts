import { Action } from 'mm-shared'
import { ADD_USERS_LIKED_TRACKS } from './musicActions'

export default function music(state = {}, { type, payload }: Action) {
  switch (type) {
    case ADD_USERS_LIKED_TRACKS:
      return { ...state, likedTracks: payload }
    default:
      return state
  }
}
