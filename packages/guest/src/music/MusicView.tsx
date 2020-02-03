import React from 'react'
import { Music } from 'mm-shared'
import EventSelect from 'event/select/EventSelectContainer'
import { Grid } from '@material-ui/core'

const MusicView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Music />
      </Grid>
    </Grid>
  )
}

export default MusicView
