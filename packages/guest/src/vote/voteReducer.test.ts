import { Action } from 'mm-shared'
import ITrackVoteStatus from './ITrackVoteStatus'
import { FETCH_EVENT_VOTES_SUCCESS } from './voteActions'
import initialState from './voteInitialState'
import vote from './voteReducer'

it('should return the initial state when no action matches', () => {
  expect(vote(undefined, {} as Action)).toEqual(initialState)
})

it('should handle FETCH_EVENT_VOTES_SUCCESS', () => {
  const votes = new Map<string, ITrackVoteStatus>()

  expect(
    vote(initialState, { type: FETCH_EVENT_VOTES_SUCCESS, payload: votes })
  ).toEqual({
    ...initialState,
    votes
  })
})
