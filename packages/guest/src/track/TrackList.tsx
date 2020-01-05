import React from 'react'
import { Track, TrackVoteStatus } from 'mm-shared'
import TrackListItem from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListProps {
  tracks: Track[]
  withVoting?: boolean
  votes?: Map<string, TrackVoteStatus>
  withSuggestingEnabled?: boolean
  onVote?: (track: Track) => void
  onTrackSelected?: (track: Track) => void
}

const TrackList = ({
  tracks = [],
  withVoting = false,
  withSuggestingEnabled = false,
  votes = new Map(),
  onVote = (t: Track) => undefined,
  onTrackSelected = (t: Track) => undefined
}: ITrackListProps) => (
  <React.Fragment>
    {tracks.map((track, i) => {
      const trackId = track.uri
      let numberOfVotes = 0
      let userVoted = false
      if (votes && votes.has(trackId)) {
        const voteStatus: TrackVoteStatus =
          votes.get(trackId) || ({} as TrackVoteStatus)
        numberOfVotes = voteStatus.numberOfVotes
        userVoted = voteStatus.votedByCurrentUser
      }

      return (
        <TrackListItem
          key={i}
          track={track}
          withVoting={withVoting}
          currentUserVoted={userVoted}
          numberOfVotes={numberOfVotes}
          onTrackSelected={onTrackSelected}
          onVote={onVote}
          withSuggestingEnabled={withSuggestingEnabled}
        />
      )
    })}
  </React.Fragment>
)

export default TrackList
