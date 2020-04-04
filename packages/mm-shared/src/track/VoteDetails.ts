import { Track } from 'music'

export default interface VoteDetails {
  isHost: boolean
  currentUserVoted: boolean
  numberOfVotes: number
  track: Track
}
