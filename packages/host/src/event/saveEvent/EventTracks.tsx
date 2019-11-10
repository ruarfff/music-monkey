import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Typography, Paper, List, ListSubheader } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import arrayMove from 'util/arrayMove'
import ITrack from 'track/ITrack'
import TrackList from 'track/TrackList'
import formatDuration from 'util/formatDuration'

import './EventTracks.scss'

interface EventTracksProps {
  tracks: ITrack[]
  onTracksChanged(tracks: ITrack[]): void
}
const EventTracks = ({ tracks = [], onTracksChanged }: EventTracksProps) => {
  const duration = isEmpty(tracks)
    ? 0
    : tracks.map(track => track.duration_ms).reduce((acc, dur) => acc + dur)

  const numTracks = tracks.length

  const handleTrackRemoved = (trackToRemove: ITrack) => {
    onTracksChanged(remove(tracks, track => track.id !== trackToRemove.id))
  }

  return isEmpty(tracks) ? (
    <Paper className="EventTracks-no-tracks">
      <Typography variant="h5" align="center" gutterBottom>
        No tracks yet
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Search for track or pick from your recommendations
      </Typography>
    </Paper>
  ) : (
    <List
      subheader={
        <ListSubheader component="div">
          {numTracks} tracks : {formatDuration(duration)}
        </ListSubheader>
      }
    >
      <TrackList
        onTrackRemoved={handleTrackRemoved}
        onDragEnd={(result: DropResult) => {
          if (!result.destination) {
            return
          }
          const reorderedTracks = [...tracks]
          arrayMove(
            reorderedTracks,
            result.source.index,
            result.destination.index
          )
          onTracksChanged(reorderedTracks)
        }}
        tracks={tracks}
      />
    </List>
  )
}

export default EventTracks
