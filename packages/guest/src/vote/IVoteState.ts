import ITrackVoteStatus from './ITrackVoteStatus'

export default interface IVoteState {
  votes: Map<string, ITrackVoteStatus>
  fetchingVotes: boolean
}
