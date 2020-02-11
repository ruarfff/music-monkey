import React, { FC } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import { Grid } from '@material-ui/core'
import Music from './MusicContainer'
import {
  useSnackbarAlert,
  Event,
  Track,
  Playlist,
  User,
  TrackRequest,
  PlaylistRequest
} from 'mm-shared'

interface MusicViewProps {
  user: User
  event: Event
  saveTrackRequest(request: TrackRequest): any
  savePlaylistRequest(request: PlaylistRequest): any
}

const MusicView: FC<MusicViewProps> = ({
  event,
  user,
  saveTrackRequest,
  savePlaylistRequest
}) => {
  const { showSuccess } = useSnackbarAlert()
  const onTrackSelected = (track: Track) => {
    saveTrackRequest({
      eventId: event.eventId,
      userId: user.userId,
      type: 'track',
      trackUri: track.uri
    } as TrackRequest)
    showSuccess('Track requested')
  }
  const onPlaylistSelected = (playlist: Playlist) => () => {
    savePlaylistRequest({
      eventId: event.eventId,
      userId: user.userId,
      playlistUri: playlist.uri,
      trackUris: playlist.tracks.items.map(t => t.track.uri)
    } as PlaylistRequest)
    showSuccess('Playlist requested')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Music
          onPlaylistSelected={onPlaylistSelected}
          onTrackSelected={onTrackSelected}
        />
      </Grid>
    </Grid>
  )
}

export default MusicView
