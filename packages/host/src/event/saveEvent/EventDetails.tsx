import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import EventDateTimePicker from './EventDateTimePicker'
import EventLocationInput from './EventLocationInput'
import EventTextInput from './EventTextInput'
import EventSettings from './EventSettingsView'
import './EventDetails.scss'

const EventDetails = () => {
  return (
    <Grid container className="EventDetails-root">
      <Grid item={true} xs={12} sm={6}>
        <Typography
          className="EventDetails-settings-title"
          variant="h6"
          align="center"
          gutterBottom
        >
          Party settings
        </Typography>
        <EventSettings />
      </Grid>
      <Grid item={true} xs={12} sm={12}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>
      <Grid item xs={12}>
        <Field name="startDateTime">
          {({
            field: { value },
            form: { setFieldValue, values }
          }: FieldProps) => {
            return (
              <EventDateTimePicker
                value={value}
                onChange={(startDateTime: Date) => {
                  if (startDateTime > values.endDateTime) {
                    setFieldValue('endDateTime', startDateTime)
                  }
                  setFieldValue('startDateTime', startDateTime)
                }}
                label="Starting At"
              />
            )
          }}
        </Field>
      </Grid>

      <Grid item xs={12}>
        <Field name="endDateTime">
          {({
            field: { value },
            form: { setFieldValue, values }
          }: FieldProps) => (
            <EventDateTimePicker
              value={value}
              onChange={(endDateTime: Date) => {
                if (endDateTime < values.startDateTime) {
                  setFieldValue('startDateTime', endDateTime)
                }
                setFieldValue('endDateTime', endDateTime)
              }}
              label="Finishing At"
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <EventLocationInput />
      </Grid>
    </Grid>
  )
}

export default EventDetails
