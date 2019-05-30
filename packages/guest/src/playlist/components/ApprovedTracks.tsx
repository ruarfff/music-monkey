import * as React from 'react'
import TrackList from '../../track/TrackList';
import IPlaylist from '../IPlaylist';
import ITrackVoteStatus from '../../vote/ITrackVoteStatus';
import ITrack from '../../track/ITrack';

interface IApprovedTracksProps {
playlist: IPlaylist
votes: Map<string, ITrackVoteStatus>
onTrackSelected: ((track: ITrack) => void)
onVote: ((track: ITrack) => void)
}

export default ({playlist, votes, onTrackSelected, onVote}: IApprovedTracksProps) => {
    return (
      <TrackList
        tracks={
            playlist.tracks &&
            playlist.tracks.items.map((s: any) => s.track)
        }
        withSuggestingEnabled={false}
        onTrackSelected={onTrackSelected}
        withVoting={true}
        votes={votes}
        onVote={onVote}
      />
    )
  }
