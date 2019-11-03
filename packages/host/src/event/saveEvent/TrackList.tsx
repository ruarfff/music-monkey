import React from 'react'
import { List } from '@material-ui/core'
import ITrack from 'track/ITrack'
import TrackItem from './TrackItem'

interface TrackListProps {
  tracks: ITrack[]
  filterList: ITrack[]
  onTrackSelected(track: ITrack): void
}

const TrackList = ({ tracks, filterList, onTrackSelected }: TrackListProps) => {
  const existingTracks = filterList.map(track => track.uri)
  return (
    <List>
      {tracks
        .filter(track => existingTracks.indexOf(track.uri) === -1)
        .map(track => (
          <TrackItem
            onSelected={onTrackSelected}
            track={track}
            key={track.uri}
          />
        ))}
    </List>
  )
}

export default TrackList
