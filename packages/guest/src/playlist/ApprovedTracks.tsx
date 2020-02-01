import React, { FC } from 'react'
import {
  Track,
  TrackVoteStatus,
  TrackList,
  Playlist,
  DecoratedSuggestion
} from 'mm-shared'

interface ApprovedTracksProps {
  playlist: Playlist
  votes: Map<string, TrackVoteStatus>
  suggestions: DecoratedSuggestion[]
  onTrackSelected: (track: Track) => void
  onVote: (track: Track) => void
}

const ApprovedTracks: FC<ApprovedTracksProps> = ({
  playlist,
  votes,
  suggestions,
  onTrackSelected,
  onVote
}) => (
  <TrackList
    tracks={playlist.tracks && playlist.tracks.items.map((s: any) => s.track)}
    suggestions={suggestions}
    withSuggestingEnabled={false}
    onTrackSelected={onTrackSelected}
    withVoting={true}
    votes={votes}
    onVote={onVote}
  />
)

export default ApprovedTracks
