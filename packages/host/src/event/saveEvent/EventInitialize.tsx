import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import EventTextInput from './EventTextInput'

interface EventInitializeProps {
  handleNext(): void
}

const EventInitialize = ({ handleNext }: EventInitializeProps) => {
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
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default EventInitialize
