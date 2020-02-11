import React, { FC } from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import { Grid } from '@material-ui/core'
import Music from './MusicContainer'
import { useSnackbarAlert, Event, Track, Playlist, User } from 'mm-shared'
import { addTracksToPlaylist } from 'playlist/playlistClient'

interface MusicViewProps {
  user: User
  event: Event
}

const MusicView: FC<MusicViewProps> = ({ event, user }) => {
  const playlist = event.playlist!
  const { showSuccess, showError } = useSnackbarAlert()
  const handleAddTrack = async (track: Track) => {
    try {
      await addTracksToPlaylist(playlist.id, [track.uri])
      showSuccess('Track Added')
    } catch (err) {
      console.error(err)
      showError('Failed to add track')
    }
  }

  const handleAddTracks = (tracks: Track[]) => {
    try {
      addTracksToPlaylist(
        playlist.id,
        tracks.map(track => track.uri)
      )
      showSuccess('Tracks Added')
    } catch (err) {
      console.error(err)
      showError('Failed to add tracks')
    }
  }

  const handlePlaylistSelected = (playlist: Playlist) => {
    handleAddTracks(playlist.tracks.items.map(item => item.track))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Music
          onPlaylistSelected={handlePlaylistSelected}
          onTrackSelected={handleAddTrack}
        />
      </Grid>
    </Grid>
  )
}

export default MusicView
