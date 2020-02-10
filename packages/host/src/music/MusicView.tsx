import React from 'react'
import EventSelect from 'event/select/EventSelectContainer'
import { Grid } from '@material-ui/core'
import Music from './MusicContainer'
import { Track, Playlist } from 'mm-shared'

const MusicView = () => {
  const handleTrackSelected = (track: Track) => {}
  const handlePlaylistSelected = (playlist: Playlist) => {}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Music
          onPlaylistSelected={handlePlaylistSelected}
          onTrackSelected={handleTrackSelected}
        />
      </Grid>
    </Grid>
  )
}

export default MusicView
