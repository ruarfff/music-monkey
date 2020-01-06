import React from 'react'
import TrackList from 'track/TrackList'
import { Track, TrackVoteStatus, Playlist } from 'mm-shared'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'

interface IApprovedTracksProps {
  playlist: Playlist
  votes: Map<string, TrackVoteStatus>
  suggestions: IDecoratedSuggestion[]
  onTrackSelected: (track: Track) => void
  onVote: (track: Track) => void
}

export default ({
  playlist,
  votes,
  suggestions,
  onTrackSelected,
  onVote
}: IApprovedTracksProps) => {
  return (
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
}
