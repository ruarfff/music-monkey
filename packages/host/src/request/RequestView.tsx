import React from 'react'
import { Grid } from '@material-ui/core'
import { acceptRequest, rejectRequest } from 'mm-shared'
import EventSelect from 'event/select/EventSelectContainer'
import Requests from './RequestsContainer'

const RequestView = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Requests onAccept={acceptRequest} onReject={rejectRequest} />
      </Grid>
    </Grid>
  )
}

export default RequestView
