import React from 'react'
import { List } from '@material-ui/core'
import { Track } from 'mm-shared'
import TrackItem from './TrackItem'

interface TrackListProps {
  tracks: Track[]
  filterList: Track[]
  onSelected(track: Track): void
}

const TrackList = ({ tracks, filterList, onSelected }: TrackListProps) => {
  const existingTracks = filterList.map(track => track.uri)
  return (
    <List>
      {tracks
        .filter(track => existingTracks.indexOf(track.uri) === -1)
        .map(track => (
          <TrackItem onSelected={onSelected} track={track} key={track.uri} />
        ))}
    </List>
  )
}

export default TrackList
