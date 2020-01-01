import { Action } from 'mm-shared'
import IVote from './IVote'

export const FETCH_EVENT_VOTES_INITIATED = 'FETCH_EVENT_VOTES_INITIATED'
export const FETCH_EVENT_VOTES_SUCCESS = 'FETCH_EVENT_VOTES_SUCCESS'
export const FETCH_EVENT_VOTES_FAILURE = 'FETCH_EVENT_VOTES_FAILURE'
export const VOTE_CREATE_INITIATED = 'VOTE_CREATE_INITIATED'
export const VOTE_CREATE_SUCCESS = 'VOTE_CREATE_SUCCESS'
export const VOTE_CREATE_FAILURE = 'VOTE_CREATE_FAILURE'
export const VOTE_DELETE_INITIATED = 'VOTE_DELETE_INITIATED'
export const VOTE_DELETE_SUCCESS = 'VOTE_DELETE_SUCCESS'
export const VOTE_DELETE_FAILURE = 'VOTE_DELETE_FAILURE'

export const fetchEventVotes = (eventId: string) =>
  ({
    type: FETCH_EVENT_VOTES_INITIATED,
    payload: eventId
  } as Action)

export const createVote = (vote: IVote) =>
  ({
    type: VOTE_CREATE_INITIATED,
    payload: vote
  } as Action)

export const deleteVote = (voteId: string) =>
  ({
    type: VOTE_DELETE_INITIATED,
    payload: voteId
  } as Action)
