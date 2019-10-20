import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import { Grid, FormControlLabel, Switch } from '@material-ui/core'
import FileUpload from 'upload/FileUpload'
import {
  eventImageUploaded,
  eventImageUploadError,
  locationSelected
} from 'event/eventActions'
import EventInput from 'components/EventInput/EventInput'
import LocationAutoComplete from 'location/LocationAutoComplete'
import EventDateTimePicker from 'event/eventCreation/EventDateTimePicker'
import LinkButton from 'components/LinkButton'

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
  const [organiser, setOrganiser] = useState()
  const [location, setLocation] = useState()
  const [startDateTime, setStartDateTime] = useState()
  const [endDateTime, setEndDateTime] = useState()

  return (
    <Grid container>
      <Typography>Event details!</Typography>
      <span>Party modes</span>
      <FormGroup row={true}>
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
      </FormGroup>

      <Grid item={true} xs={12} sm={6}>
        <FileUpload
          onUpload={eventImageUploaded}
          onUploadError={eventImageUploadError}
        />
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <EventInput
          label="Organizer"
          placeholder="Who is organising this event?"
          value={organiser}
          error={!organiser}
          errorLabel="Required"
          onChange={(value: string) => {
            setOrganiser(value)
          }}
        />
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        <LocationAutoComplete
          value={location ? location.address || '' : ''}
          onSelect={locationSelected}
          onChange={(location: string) => {
            setLocation(location)
          }}
          placeholder="Search for place"
          formClass="CreateEvent-formItem"
        />
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <EventDateTimePicker
          disablePast={true}
          value={startDateTime}
          onChange={(value: string) => {
            setStartDateTime(value)
          }}
          label="Starting At"
        />
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <EventDateTimePicker
          disablePast={true}
          value={endDateTime}
          onChange={(value: string) => {
            setEndDateTime(value)
          }}
          label="Finishing At"
        />
      </Grid>
      <Grid item={true} xs={12}>
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
