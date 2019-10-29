import React from 'react'
import { Grid, FormGroup, Hidden } from '@material-ui/core'
import LinkButton from 'components/LinkButton'
import EventTextInput from './EventTextInput'
import EventLocationInput from './EventLocationInput'

interface EventInitializeProps {
  nextPath: string
  formValid: boolean
}

const EventInitialize = ({ nextPath, formValid }: EventInitializeProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EventTextInput name="eventName" label="Event Name" autoFocus={true} />
      </Grid>
      <Grid item xs={12}>
        <EventTextInput
          name="eventDescription"
          multiline={true}
          label="Event Description"
        />
      </Grid>
      <Grid item xs={12}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>
      <Grid item xs={12}>
        <EventLocationInput />
      </Grid>
      <Grid item xs={12}>
        <Hidden smDown implementation="css">
          <FormGroup className="SaveEvent-form-actions">
            <LinkButton
              to={nextPath}
              variant="contained"
              color="primary"
              disabled={!formValid}
            >
              Next
            </LinkButton>
          </FormGroup>
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default EventInitialize
