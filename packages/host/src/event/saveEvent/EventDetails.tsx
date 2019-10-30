import React from 'react'
import { Grid, FormControlLabel, Switch, Typography } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import ImageEditor from 'imageEdit/ImageEditor'
import EventDateTimePicker from './EventDateTimePicker'
import IEventSettings from 'event/IEventSettings'
import EventTextInput from './EventTextInput'
import EventLocationInput from './EventLocationInput'
import './EventDetails.scss'

const EventDetails = () => {
  return (
    <Grid container className="EventDetails-root">
      <Grid item xs={12} className="EventDetails-image">
        <Typography variant="h6" align="center" gutterBottom>
          Event Image
        </Typography>
        <Field name="image">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <ImageEditor
              image={value}
              onImageChanged={image => {
                setFieldValue('image', image)
              }}
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12} className="EventDetails-party-settings">
        <Field name="settings">
          {({ field, form: { setFieldValue, setFieldError } }: FieldProps) => {
            const settings: IEventSettings = field.value
            return (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      value="Suggesting Playlists Enabled"
                      checked={settings.suggestingPlaylistsEnabled}
                      onChange={() => {
                        setFieldValue('settings', {
                          ...settings,
                          suggestingPlaylistsEnabled: !settings.suggestingPlaylistsEnabled
                        })
                      }}
                    />
                  }
                  label="Allow Playlist Suggestions"
                />
                <FormControlLabel
                  control={
                    <Switch
                      value="Auto Accept Suggestions Enabled"
                      checked={settings.autoAcceptSuggestionsEnabled}
                      onChange={() => {
                        setFieldValue('settings', {
                          ...settings,
                          autoAcceptSuggestionsEnabled: !settings.autoAcceptSuggestionsEnabled
                        })
                      }}
                    />
                  }
                  label="Auto Accept Suggestions"
                />
                <FormControlLabel
                  control={
                    <Switch
                      value="dynamic Voting Enabled"
                      checked={settings.dynamicVotingEnabled}
                      onChange={() => {
                        setFieldValue('settings', {
                          ...settings,
                          dynamicVotingEnabled: !settings.dynamicVotingEnabled
                        })
                      }}
                    />
                  }
                  label="Dynamic Voting"
                />
              </>
            )
          }}
        </Field>
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
      <Grid item xs={12}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>
      <Grid item xs={12}>
        <EventLocationInput />
      </Grid>
    </Grid>
  )
}

export default EventDetails
