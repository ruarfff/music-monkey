import { Action } from '../'
import { VoteState } from './VoteState'
import {
  FETCH_EVENT_VOTES_INITIATED,
  FETCH_EVENT_VOTES_SUCCESS
} from './voteActions'
import initialState from './voteInitialState'

export default function vote(
  state: VoteState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_EVENT_VOTES_INITIATED:
      return {
        ...state,
        fetchingVotes: true
      }
    case FETCH_EVENT_VOTES_SUCCESS:
      return {
        ...state,
        votes: new Map(Object.entries(payload)),
        fetchingVotes: false
      } as VoteState
    default:
      return state
  }
}
