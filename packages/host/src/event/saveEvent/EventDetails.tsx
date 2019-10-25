import React, { useState } from 'react'
import { Grid, FormControlLabel, Switch } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import FileUpload from 'upload/FileUpload'
import LocationAutoComplete from 'location/LocationAutoComplete'
import EventDateTimePicker from './EventDateTimePicker'
import EventTextInput from './EventTextInput'
import ILocation from 'location/ILocation'
import MapComponent from 'location/MapComponent'
import IEventSettings from 'event/IEventSettings'
import './EventDetails.scss'

const EventDetails = () => {
  const [location, setLocation] = useState({
    latLng: { lat: 0, lng: 0 }
  } as ILocation)
  return (
    <Grid container className="EventDetails-root">
      <Grid item xs={12} className="EventDetails-image">
        <Field name="imageUrl">
          {({ form: { setFieldValue, setFieldError } }: FieldProps) => (
            <FileUpload
              width={200}
              height={200}
              onUpload={image => {
                setFieldValue('imageUrl', image)
              }}
              onUploadError={err => {
                setFieldError('imageUrl', 'Failed to upload event image')
                console.error(err)
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

      <Grid item xs={12}>
        <Field name="location" value={location}>
          {() => (
            <LocationAutoComplete
              value={location ? location.address || '' : ''}
              onSelect={(location: any) => {
                setLocation(location)
              }}
              onChange={(address: string) => {
                setLocation({ address, latLng: { lat: 0, lng: 0 } })
              }}
              placeholder="Search for place"
            />
          )}
        </Field>
      </Grid>

      <Grid item xs={12}>
        <MapComponent coords={location.latLng} />
      </Grid>

      <Grid item xs={12}>
        <Field name="startDateTime">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
            console.log('Heloooooooooooooo', value)
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
