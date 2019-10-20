import React from 'react'
import { Grid, FormGroup } from '@material-ui/core'
import LinkButton from 'components/LinkButton'
import EventTextInput from './EventTextInput'

interface EventInitializeProps {
  nextPath: string
}

const EventInitialize = ({ nextPath }: EventInitializeProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup className="SaveEvent-form-content">
          <EventTextInput
            name="eventName"
            label="Event Name"
            autoFocus={true}
          />
          <EventTextInput
            name="eventDescription"
            multiline={true}
            label="Event Description"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <FormGroup className="SaveEvent-form-actions">
          <LinkButton to={nextPath} variant="contained" color="primary">
            Next
          </LinkButton>
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default EventInitialize
