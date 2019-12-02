import React from 'react'
import { Grid } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import EventDateTimePicker from './EventDateTimePicker'
import EventLocationInput from './EventLocationInput'
import EventTextInput from './EventTextInput'
import './EventDetails.scss'

const EventDetails = () => {
  return (
    <Grid container className="EventDetails-root">
      <Grid item={true} xs={12} sm={6}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>
      <Grid item xs={12}>
        <Field name="startDateTime">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
            return (
              <EventDateTimePicker
                disablePast={true}
                value={value}
                onChange={(startDateTime: Date) => {
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
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <EventDateTimePicker
              disablePast={true}
              value={value}
              onChange={(endDateTime: Date) => {
                setFieldValue('endDateTime', endDateTime)
              }}
              label="Finishing At"
            />
          )}
        </Field>
      </Grid>
      {/* <Grid item xs={12}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid> */}
      <Grid item xs={12}>
        <EventLocationInput />
      </Grid>
    </Grid>
  )
}

export default EventDetails
