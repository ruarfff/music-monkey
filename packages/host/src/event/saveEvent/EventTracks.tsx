import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Typography, Paper, List, ListSubheader } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import remove from 'lodash/remove'
import {
  Track,
  arrayMove,
  formatDuration,
  Playlist,
  TrackList
} from 'mm-shared'
import {
  reOrderPlaylist,
  removeTrackFromPlaylist
} from 'playlist/playlistClient'

import './EventTracks.scss'

interface EventTracksProps {
  playlist: Playlist
  tracks: Track[]
  onTracksChanged(tracks: Track[]): void
}
const EventTracks = ({
  tracks = [],
  playlist,
  onTracksChanged
}: EventTracksProps) => {
  const duration = isEmpty(tracks)
    ? 0
    : tracks.map(track => track.duration_ms).reduce((acc, dur) => acc + dur)

  const numTracks = tracks.length

  const handleTrackRemoved = (trackToRemove: Track) => {
    const position = tracks.indexOf(trackToRemove)
    removeTrackFromPlaylist(playlist.id, trackToRemove.uri, position)
    onTracksChanged(remove(tracks, track => track.id !== trackToRemove.id))
  }

  return isEmpty(tracks) ? (
    <Paper className="EventTracks-no-tracks">
      <Typography variant="h5" align="center" gutterBottom>
        No tracks yet
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Search for tracks or pick from your recommendations
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
          reOrderPlaylist(
            playlist,
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
