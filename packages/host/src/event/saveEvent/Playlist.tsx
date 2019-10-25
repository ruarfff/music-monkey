import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Typography, List } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import arrayMove from 'util/arrayMove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'

interface PlaylistProps {
  tracks: ITrack[]
  onTrackRemoved(track: ITrack): void
  onTrackOrderChanged(tracks: ITrack[]): void
}
const Playlist = ({
  tracks,
  onTrackOrderChanged,
  onTrackRemoved
}: PlaylistProps) => {
  return isEmpty(tracks) ? (
    <Typography variant="h5" align="center">
      No tracks yet
    </Typography>
  ) : (
    <List>
      <TrackList
        onTrackRemoved={onTrackRemoved}
        onDragEnd={(result: DropResult) => {
          if (!result.destination) {
            return
          }
          const reorderedTracks = [...tracks]
          arrayMove(tracks, result.source.index, result.destination.index)

          onTrackOrderChanged(reorderedTracks)
        }}
        tracks={tracks}
      />
    </List>
  )
}

export default Playlist
