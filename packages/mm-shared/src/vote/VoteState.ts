import { TrackVoteStatus } from './TrackVoteStatus'

export interface VoteState {
  votes: Map<string, TrackVoteStatus>
  fetchingVotes: boolean
}
