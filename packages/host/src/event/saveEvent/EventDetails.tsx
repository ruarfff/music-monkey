import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid, FormControlLabel, Switch } from '@material-ui/core'
import FileUpload from 'upload/FileUpload'
import LocationAutoComplete from 'location/LocationAutoComplete'
import LinkButton from 'components/LinkButton'
import EventDateTimePicker from './EventDateTimePicker'
import EventTextInput from './EventTextInput'
import ILocation from 'location/ILocation'
import MapComponent from 'location/MapComponent'
import './EventDetails.scss'

interface EventDetailsProps {
  nextPath: string
  backPath: string
}

const EventDetails = ({ nextPath, backPath }: EventDetailsProps) => {
  const [settings, setSettings] = useState({
    suggestingPlaylistsEnabled: false,
    autoAcceptSuggestionsEnabled: false,
    dynamicVotingEnabled: false
  })
  const [location, setLocation] = useState({
    latLng: { lat: 0, lng: 0 }
  } as ILocation)
  const [startDateTime, setStartDateTime] = useState()
  const [endDateTime, setEndDateTime] = useState()
  const [eventImage, setEventImage] = useState()
  const [uploadError, setUploadError] = useState()

  console.log(eventImage)
  console.log(uploadError)

  return (
    <Grid container className="EventDetails-root">
      <Grid item xs={12} className="EventDetails-image">
        <FileUpload
          width={200}
          height={200}
          onUpload={image => {
            setEventImage(image)
          }}
          onUploadError={err => {
            setUploadError(err)
          }}
        />
      </Grid>
      <Grid item xs={12} className="EventDetails-party-settings">
        <FormControlLabel
          control={
            <Switch
              value="Suggesting Playlists Enabled"
              checked={settings.suggestingPlaylistsEnabled}
              onChange={() => {
                setSettings({
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
                setSettings({
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
                setSettings({
                  ...settings,
                  dynamicVotingEnabled: !settings.dynamicVotingEnabled
                })
              }}
            />
          }
          label="Dynamic Voting"
        />
      </Grid>

      <Grid item xs={12}>
        <EventTextInput name="organizer" label="Organizer" />
      </Grid>

      <Grid item xs={12}>
        <LocationAutoComplete
          value={location ? location.address || '' : ''}
          onSelect={(location: any) => {
            setLocation(location)
          }}
          onChange={(location: string) => {
            setLocation({ address: location })
          }}
          placeholder="Search for place"
        />
      </Grid>

      <Grid item xs={12}>
        <MapComponent coords={location.latLng} />
      </Grid>

      <Grid item xs={12}>
        <EventDateTimePicker
          disablePast={true}
          value={startDateTime}
          onChange={(value: string) => {
            setStartDateTime(value)
          }}
          label="Starting At"
        />
      </Grid>

      <Grid item xs={12}>
        <EventDateTimePicker
          disablePast={true}
          value={endDateTime}
          onChange={(value: string) => {
            setEndDateTime(value)
          }}
          label="Finishing At"
        />
      </Grid>

      <Grid item xs={12}>
        <FormGroup className="SaveEvent-form-actions">
          <LinkButton to={backPath} variant="contained" color="secondary">
            Back
          </LinkButton>
          <LinkButton to={nextPath} variant="contained" color="primary">
            Next
          </LinkButton>
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default EventDetails
