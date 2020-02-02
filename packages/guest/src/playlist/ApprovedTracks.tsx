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
  onSelected: (track: Track) => void
  onVote: (track: Track) => void
}

const ApprovedTracks: FC<ApprovedTracksProps> = ({
  playlist,
  votes,
  suggestions,
  onSelected,
  onVote
}) => (
  <TrackList
    tracks={playlist.tracks && playlist.tracks.items.map((s: any) => s.track)}
    suggestions={suggestions}
    votes={votes}
    onSelected={onSelected}
    onVote={onVote}
    options={{ canRequest: true, canVote: true }}
  />
)

export default ApprovedTracks
