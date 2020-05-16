import React, { FC, useEffect } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import { Grid } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
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

interface MusicViewProps extends RouteComponentProps<any> {
  user: User
  event: Event
  saveTrackRequest(request: TrackRequest): any
  savePlaylistRequest(request: PlaylistRequest): any
  setEventId(eventId: string): any
}

const MusicView: FC<MusicViewProps> = ({
  event,
  user,
  match,
  saveTrackRequest,
  savePlaylistRequest,
  setEventId
}) => {
  const eventId = match.params.eventId
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
      trackUris: playlist.tracks.items.map((t) => t.track.uri)
    } as PlaylistRequest)
    showSuccess('Playlist requested')
  }

  useEffect(() => {
    if (eventId !== event.eventId) setEventId(eventId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

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

export default withRouter(MusicView)
