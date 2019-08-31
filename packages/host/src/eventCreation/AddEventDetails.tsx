import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import EventInput from '../components/EventInput/EventInput'
import IEvent from '../event/IEvent'
import LocationAutoComplete from '../location/LocationAutoCompleteContainer'
import MapComponent from '../components/MapComponent'
import FileUpload from '../upload/FileUpload'
import EventDateTimePicker from './EventDateTimePicker'

interface AddEventDetailsProps {
  event: IEvent
  isEditing: boolean
  cancel: () => void
  prevStep: () => void
  showConfirmationDialog: () => void
  handleSaveEvent: () => void
  eventImageUploaded: (value: any) => any
  eventImageUploadError: (error: any) => any
}

const AddEventDetails = ({
  event,
  isEditing,
  cancel,
  prevStep,
  showConfirmationDialog,
  handleSaveEvent,
  eventImageUploaded,
  eventImageUploadError
}: AddEventDetailsProps) => {
  const [name, setName] = useState(event.name)
  const [description, setDescription] = useState(event.description)
  const [organizer, setOrganizer] = useState(event.organizer)
  const [startDateTime, setStartDateTime] = useState(event.startDateTime)
  const [endDateTime, setEndDateTime] = useState(event.endDateTime)
  const [eventSettings, setEventSettings] = useState(event.settings)

  return (
    <Grid container={true} spacing={24} direction="row">
      <Grid item={true} xs={12} sm={6}>
        <EventInput
          label={'Event Name'}
          placeholder={'Provide a name for your event'}
          value={name}
          onChange={setName}
          error={!name}
          errorLabel={'Required'}
        />
        <EventInput
          label={'Event description'}
          maxRows={11}
          value={description}
          onChange={setDescription}
        />

        <Grid container={true} direction={'column'}>
          <span>Party modes</span>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Switch
                  value={'suggesting Playlists Enabled'}
                  checked={eventSettings.suggestingPlaylistsEnabled}
                  onChange={() => {
                    setEventSettings({
                      ...eventSettings,
                      suggestingPlaylistsEnabled: !eventSettings.suggestingPlaylistsEnabled
                    })
                  }}
                />
              }
              label="Allow Playlist Suggestions"
            />
            <FormControlLabel
              control={
                <Switch
                  value={'auto Accept Suggestions Enabled'}
                  checked={eventSettings.autoAcceptSuggestionsEnabled}
                  onChange={() => {
                    setEventSettings({
                      ...eventSettings,
                      autoAcceptSuggestionsEnabled: !eventSettings.autoAcceptSuggestionsEnabled
                    })
                  }}
                />
              }
              label="Auto Accept Suggestions"
            />
            <FormControlLabel
              control={
                <Switch
                  value={'dynamic Voting Enabled'}
                  checked={eventSettings.dynamicVotingEnabled}
                  onChange={() => {
                    setEventSettings({
                      ...eventSettings,
                      dynamicVotingEnabled: !eventSettings.dynamicVotingEnabled
                    })
                  }}
                />
              }
              label="Dynamic Voting"
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <FileUpload
          onUpload={eventImageUploaded}
          onUploadError={eventImageUploadError}
        />
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <EventInput
          label={'Organizer'}
          placeholder={'Who is organising this event?'}
          value={organizer}
          error={!organizer}
          errorLabel={'Required'}
          onChange={setOrganizer}
        />
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        <LocationAutoComplete
          value={event.location ? event.location.address || '' : ''}
          placeholder="Search for place"
          formClass="CreateEvent-formItem"
        />
      </Grid>
      {event.location && <MapComponent coords={event.location.latLng} />}

      <Grid item={true} xs={12} sm={6}>
        <EventDateTimePicker
          disablePast={true}
          value={startDateTime}
          onChange={setStartDateTime}
          label={'Starting At'}
        />
      </Grid>

      <Grid item={true} xs={12} sm={6}>
        <EventDateTimePicker
          disablePast={true}
          value={endDateTime}
          onChange={setEndDateTime}
          label={'Finishing At'}
        />
      </Grid>

      <div className="control-btn-row">
        {isEditing && (
          <Button variant="contained" onClick={showConfirmationDialog}>
            <span className="control-btn-text-primary">Delete Event</span>
          </Button>
        )}
        <Button variant="contained" color="default" onClick={cancel}>
          <span className="control-btn-text-primary">Cancel</span>
        </Button>
        <Button variant="contained" color="default" onClick={prevStep}>
          <span className="control-btn-text-primary">Prev</span>
        </Button>
        <Button
          disabled={!event.startDateTime || !event.endDateTime}
          variant="contained"
          color="secondary"
          onClick={handleSaveEvent}
        >
          <span className="control-btn-text-secondary">Next</span>
        </Button>
      </div>
    </Grid>
  )
}

export default AddEventDetails
