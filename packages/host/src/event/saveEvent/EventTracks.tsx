import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Typography, List, Paper } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import arrayMove from 'util/arrayMove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'

interface EventTracksProps {
  tracks: ITrack[]
  onTrackRemoved(track: ITrack): void
  onTrackOrderChanged(tracks: ITrack[]): void
}
const EventTracks = ({
  tracks,
  onTrackOrderChanged,
  onTrackRemoved
}: EventTracksProps) => {
  return isEmpty(tracks) ? (
    <Paper>
      <Typography variant="subtitle2" align="center" gutterBottom>
        No tracks yet
      </Typography>
    </Paper>
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

export default EventTracks
