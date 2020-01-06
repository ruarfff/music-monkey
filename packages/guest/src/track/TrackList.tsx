import React, { FunctionComponent } from 'react'
import { Track, TrackVoteStatus } from 'mm-shared'
import TrackListItem from './TrackListItem'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'
import { List } from '@material-ui/core'

interface TrackListProps {
  tracks: Track[]
  suggestions?: IDecoratedSuggestion[]
  withVoting?: boolean
  votes?: Map<string, TrackVoteStatus>
  withSuggestingEnabled?: boolean
  onVote?: (track: Track) => void
  onTrackSelected?: (track: Track) => void
}

const TrackList: FunctionComponent<TrackListProps> = ({
  tracks = [],
  suggestions = [],
  withVoting = false,
  withSuggestingEnabled = false,
  votes = new Map(),
  onVote = (t: Track) => undefined,
  onTrackSelected = (t: Track) => undefined
}) => (
  <List>
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
          suggestion={suggestions.find(s => s.track.uri === trackId)}
          withVoting={withVoting}
          currentUserVoted={userVoted}
          numberOfVotes={numberOfVotes}
          onTrackSelected={onTrackSelected}
          onVote={onVote}
          withSuggestingEnabled={withSuggestingEnabled}
        />
      )
    })}
  </List>
)

export default TrackList
