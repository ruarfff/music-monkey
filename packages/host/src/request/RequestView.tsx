import React from 'react'
import { Grid } from '@material-ui/core'
import { acceptRequest, rejectRequest, Suggestion } from 'mm-shared'
import EventSelect from 'event/select/EventSelectContainer'
import Requests from './RequestsContainer'

const RequestView = () => {
  const handleRejectRequest = (request: Suggestion) => {
    rejectRequest(request)
  }

  const handleAcceptRequest = (request: Suggestion) => {
    acceptRequest(request)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <EventSelect />
      </Grid>
      <Grid item xs={12}>
        <Requests
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      </Grid>
    </Grid>
  )
}

export default RequestView
