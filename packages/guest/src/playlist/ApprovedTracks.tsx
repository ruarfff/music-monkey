import React from 'react'
import TrackList from 'track/TrackList'
import { Track, TrackVoteStatus, Playlist } from 'mm-shared'

interface IApprovedTracksProps {
  playlist: Playlist
  votes: Map<string, TrackVoteStatus>
  onTrackSelected: (track: Track) => void
  onVote: (track: Track) => void
}

export default ({
  playlist,
  votes,
  onTrackSelected,
  onVote
}: IApprovedTracksProps) => {
  return (
    <TrackList
      tracks={playlist.tracks && playlist.tracks.items.map((s: any) => s.track)}
      withSuggestingEnabled={false}
      onTrackSelected={onTrackSelected}
      withVoting={true}
      votes={votes}
      onVote={onVote}
    />
  )
}
