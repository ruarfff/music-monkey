import React from 'react'
import { Grid, FormControlLabel, Switch } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import ImageEditor from 'imageEdit/ImageEditor'
import LocationAutoComplete from 'location/LocationAutoComplete'
import EventDateTimePicker from './EventDateTimePicker'
import EventTextInput from './EventTextInput'
import MapComponent from 'location/MapComponent'
import IEventSettings from 'event/IEventSettings'
import './EventDetails.scss'

const EventDetails = () => {
  return (
    <Grid container className="EventDetails-root">
      <Grid item xs={12} className="EventDetails-image">
        <Field name="image">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <ImageEditor
              image={value}
              onImageChanged={image => {
                console.log('Image:   ', image)
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
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>

      <Field name="location">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <>
            <Grid item xs={12}>
              <LocationAutoComplete
                value={value ? value.address || '' : ''}
                onSelect={(location: any) => {
                  setFieldValue('location', location)
                }}
                onChange={(address: string) => {
                  setFieldValue('location', {
                    address,
                    latLng: { lat: 0, lng: 0 }
                  })
                }}
                placeholder="Search for place"
              />
            </Grid>
            <Grid item xs={12}>
              <MapComponent coords={value.latLng} />
            </Grid>
          </>
        )}
      </Field>

      <Grid item xs={12}>
        <Field name="startDateTime">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
            return (
              <EventDateTimePicker
                disablePast={true}
                value={value}
                onChange={(startDateTime: any) => {
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
              onChange={(endDateTime: any) => {
                setFieldValue('endDateTime', endDateTime)
              }}
              label="Finishing At"
            />
          )}
        </Field>
      </Grid>
    </Grid>
  )
}

export default EventDetails
