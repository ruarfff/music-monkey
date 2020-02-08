import React from 'react'
import { Grid } from '@material-ui/core'
import EventSelect from 'event/select/EventSelectContainer'
import Requests from './RequestsContainer'

const RequestView = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Requests />
      </Grid>
    </Grid>
  )
}

export default RequestView
