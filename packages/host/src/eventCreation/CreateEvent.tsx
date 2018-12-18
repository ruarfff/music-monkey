import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import * as _ from 'lodash'
import * as React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EventInput from '../components/EventInput/EventInput'
import GenrePicker from '../components/GenrePicker/GenrePicker'
import LocationAutoComplete from '../components/location/LocationAutoComplete'
import MapComponent from '../components/MapComponent'
import EventSearchTracks from '../components/SearchTracks/EventSearchTracksContainer'
import IEvent from '../event/IEvent'
import IEventErrors from '../event/IEventErrors'
import IPlaylistInput from '../event/IPlaylistInput'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import FileUpload from '../upload/FileUpload'
import IUser from '../user/IUser'
import './CreateEvent.scss'
import CreateEventSteps from './CreateEventSteps'
import EventDateTimePicker from './EventDateTimePicker'
import PlaylistSelection from './PlaylistSelection'
import ShareEvent from './ShareEvent'

const decorate = withStyles((theme: Theme) => ({
  button: {
    marginRight: '30px',
    '&:last-child': {
      marginRight: 0
    }
  },
  addCoHost: {
    marginTop: '10px'
  },
  dropDown: {
    display: 'inline-block',
    marginTop: '20px',
    borderRadius: '4px',
    border: '1px solid #979797',
    paddingLeft: '16px',
    minHeight: '40px',
    marginRight: '20px',
    top: '8px',
    '&:hover:not($disabled):before': {
      borderBottom: '1px solid #979797!important'
    },
    '&:before': {
      content: 'none'
    },
    '&:after': {
      content: 'none'
    }
  },
  codeInput: {
    display: 'inline-block'
  },
  disabled: {

  }
}))

const SweetAlert = withReactContent(Swal) as any

interface ICreateEventProps {
  user: IUser
  event: IEvent
  errors: IEventErrors
  playlistInput: IPlaylistInput
  playlists: IPlaylist[]
  copiedToClipboard: boolean
  cancel(): void
  closeCreatePlaylist(): IAction
  closeExistingPlaylist(): IAction
  createEventPlaylist(playlist: IPlaylistDetails): IAction
  eventContentUpdated(content: any): IAction
  eventImageUploadError(error: Error): IAction
  eventImageUploaded(url: string): IAction
  initializeCreateForm(event: IEvent, user: IUser): IAction
  locationChanged(address: string): IAction
  locationSelected(address: string): IAction
  editEventRequest(event: IEvent): IAction
  saveEvent(event: IEvent): IAction
  selectCreatePlaylist(): IAction
  selectExistingPlaylist(): IAction
  fetchPlaylists(user: IUser): IAction
  copyEventInvite(): IAction
  eventSavingReset(): IAction
  acknowledgeEventInviteCopied(): IAction
}

class CreateEvent extends React.PureComponent<ICreateEventProps & WithStyles> {
  public state = {
    currentStep: 0,
    anchorCoHost: null,
    eventType: 'public',
    showSaveDialog: true,
    showRequiredDialog: true,
    showFinishCreatingEventDialog: true,
    showCreatePlaylistErrorDialog: true,
    name: '',
    description: '',
    organizer: '',
    venue: '',
    genre: '',
  }

  public componentDidMount() {
    this.props.eventSavingReset()
    this.props.initializeCreateForm(this.props.event, this.props.user)
  }

  public componentWillUpdate() {
    if (this.state.organizer === '') {
      this.setState({
        organizer: this.props.event.organizer
      })
    }
  }

  public prevStep = () => {
    const { currentStep } = this.state
    if (currentStep !== 0) {
      this.setState({ currentStep: currentStep - 1 })
    }
  }

  public onDynamicChange = (key: string) => (content: any) => {
    const eventPart = {}
    eventPart[key] = content
    this.props.eventContentUpdated(eventPart)
  }

  public setChanges = () => {
    const decoratedState = _.omit(this.state, 'currentStep', 'anchorCoHost', 'eventType', 'showSaveDialog')
    this.props.eventContentUpdated(decoratedState)
  }

  public nextStep = () => {
    const {
      currentStep,
      name,
      organizer,
      venue
    } = this.state

    if (currentStep === 0 &&
      !name ||
      !organizer ||
      !venue ||
      !this.props.event.playlistUrl
    ) {
      this.showRequiredDialog()
    } else {
      this.setChanges()
      if (currentStep !== 2) {
        this.setState({ currentStep: currentStep + 1 })
      }
    }
  }

  public showCreatePlaylistErrorDialog = () => {
    this.setState({ showCreatePlaylistErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Playlist wasn`t created',
      type: 'error'
    }).then()
  }

  public showRequiredDialog = () => {
    this.setState({ showRequiredDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Fill in all required fields',
      type: 'error'
    }).then()
  }

  public showFinishCreatingEventDialog = () => {
    this.setState({ showFinishCreatingEventDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Finish creating of event',
      type: 'error'
    }).then()
  }

  public showSavedDialogue = () => {
    this.setState({ showSaveDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#00838F',
      title: 'Event Saved!',
      type: 'success'
    }).then()
  }

  public pickStep = (step: number) => {
    const {
      currentStep,
      name,
      organizer,
      venue
    } = this.state
    if (currentStep === 0 && (
        !name ||
        !organizer ||
        !venue ||
        !this.props.event.playlistUrl
      )
    ) {
      this.showRequiredDialog()
    } else if(step === 2 && this.props.event.createdAt === undefined) {
      this.showFinishCreatingEventDialog()
    } else {
      this.setState({ currentStep: step })
      this.setChanges()
    }
  }

  public renderMap = (coords: any) => {
    return <MapComponent coords={coords} />
  }

  public renderFirstStep = () => {
    const {
      eventImageUploaded,
      eventImageUploadError,
      selectCreatePlaylist,
      selectExistingPlaylist,
      fetchPlaylists,
      user,
      playlistInput,
      playlists,
      closeExistingPlaylist,
      closeCreatePlaylist,
      createEventPlaylist,
      event,
      errors,
      classes
    } = this.props

    const { name, description, organizer, venue } = this.state
    return (
      <React.Fragment>
        {errors.playlistCreation && this.showCreatePlaylistErrorDialog()}
        <Grid item={true} xs={12} sm={6}>
          <EventInput
            label={'Event Name'}
            placeholder={'Provide a name for your event'}
            value={name}
            onChange={this.handleContentUpdated('name')}
            error={!name}
            errorLabel={'Required'}
          />
          <EventInput
            label={'Event description'}
            maxRows={11}
            value={description || ''}
            onChange={this.handleContentUpdated('description')}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <FileUpload
            onUpload={eventImageUploaded}
            onUploadError={eventImageUploadError}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <EventInput
            label={'Venue'}
            placeholder={''}
            error={!venue}
            errorLabel={'Required'}
            value={venue || ''}
            onChange={this.handleContentUpdated('venue')}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <EventInput
            label={'Organizer'}
            placeholder={'Who is organising this event?'}
            value={organizer ? organizer : this.props.event.organizer}
            error={!organizer}
            errorLabel={'Required'}
            onChange={this.handleContentUpdated('organizer')}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <GenrePicker
            onChange={this.handleContentUpdated('genre')}
          />
        </Grid>
        <Grid item={true} xs={12} sm={12}>
          <PlaylistSelection
            playlists={playlists}
            fetchPlaylists={fetchPlaylists}
            user={user}
            value={event && event.playlistUrl}
            onPlaylistAdded={this.onDynamicChange('playlistUrl')}
            playlistInput={playlistInput}
            selectExistingPlaylist={selectExistingPlaylist}
            closeExistingPlaylist={closeExistingPlaylist}
            selectCreatePlaylist={selectCreatePlaylist}
            closeCreatePlaylist={closeCreatePlaylist}
            createEventPlaylist={createEventPlaylist}
          />
        </Grid>
        <Grid item={true} xs={12} sm={12}>

          {event.playlistUrl &&
            playlists.map((playlist: IPlaylist, key) =>
              event.playlistUrl === playlist.external_urls.spotify &&
              <React.Fragment key={key}>
                <span>Add tracks to playlist</span>
                <EventSearchTracks playlist={playlist}/>
              </React.Fragment>
            )
          }
        </Grid>
        <div className="control-btn-row">
          <Button
            variant="contained"
            onClick={this.handleCancel}
            className={classes.button}
          >
            <span className="control-btn-text-primary">Cancel</span>
          </Button>
          <Button
            // disabled={!name || !organizer || !venue || !event.playlistUrl}
            onClick={this.nextStep}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            <span className="control-btn-text-secondary">Next</span>
          </Button>
        </div>
      </React.Fragment>
    )
  }

  public renderSecondStep = () => {
    const {
      event,
      classes,
      locationChanged,
      locationSelected,
    } = this.props

    return (
      <React.Fragment>
        <Grid item={true} xs={12} sm={12}>
          <LocationAutoComplete
            value={event.location ? event.location.address || '' : ''}
            onSelect={locationSelected}
            onChange={locationChanged}
            placeholder="Search for place"
            formClass="CreateEvent-formItem"
          />
        </Grid>
        {event.location && this.renderMap(event.location.latLng)}

        <Grid item={true} xs={12} sm={6}>
          <EventDateTimePicker
            disablePast={true}
            value={event.startDateTime}
            onChange={this.onDynamicChange('startDateTime')}
            label={'Starting At'}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <EventDateTimePicker
            disablePast={true}
            value={event.endDateTime}
            onChange={this.onDynamicChange('endDateTime')}
            label={'Finishing At'}
          />
        </Grid>

        <div className="control-btn-row">
          <Button
            variant="contained"
            color="default"
            onClick={this.handleCancel}
            className={classes.button}
          >
            <span className="control-btn-text-primary">Cancel</span>
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={this.prevStep}
            className={classes.button}
          >
            <span className="control-btn-text-primary">Prev</span>
          </Button>
          <Button
            disabled={
              !event.startDateTime ||
              !event.endDateTime
            }
            variant="contained"
            color="secondary"
            onClick={this.handleSaveEvent}
            className={classes.button}
          >
            <span className="control-btn-text-secondary">
              {
                this.props.event.createdAt === undefined ?
                  'Create Event' :
                  'Edit Event'
              }
              </span>
          </Button>
        </div>
      </React.Fragment>
    )
  }

  public renderThirdStep = () => {
    const {
      event,
      copyEventInvite,
      acknowledgeEventInviteCopied,
      copiedToClipboard
    } = this.props

    if (this.state.currentStep === 2 && this.state.showSaveDialog) {
      this.showSavedDialogue()
    }
    return (
      <React.Fragment>
        <ShareEvent
          copiedToClipboard={copiedToClipboard}
          acknowledgeEventInviteCopied={acknowledgeEventInviteCopied}
          copyEventInvite={copyEventInvite}
          event={event}
        />
      </React.Fragment>
    )
  }

  public render() {
    return (
      <React.Fragment>
        <CreateEventSteps pickStep={this.pickStep} step={this.state.currentStep} />
        <form className="CreateEvent-root" noValidate={true} autoComplete="off">
            {
              <div hidden={this.state.currentStep !== 0}>
                <Grid
                  container={true}
                  spacing={24}
                  alignItems="center"
                  direction="row"
                >
                  {this.renderFirstStep()}
                </Grid>
              </div>
            }
            {
              <div hidden={this.state.currentStep !== 1}>
                <Grid
                  container={true}
                  spacing={24}
                  alignItems="center"
                  direction="row"
                >
                  {this.renderSecondStep()}
                </Grid>
              </div>
            }
            {this.state.currentStep === 2 &&
              <Grid
                container={true}
                spacing={24}
                alignItems="center"
                direction="row"
              >
                { this.renderThirdStep()}
              </Grid>
            }
        </form>
      </React.Fragment>
    )
  }

  private handleCancel = () => {
    this.props.cancel()
  }

  private handleSaveEvent = () => {
    this.nextStep()
    if (this.props.event.createdAt !== undefined) {
      this.props.editEventRequest(this.props.event)
    } else {
      setTimeout(() => {
        this.props.saveEvent(this.props.event)
      }, 1000)
    }
  }

  private handleContentUpdated = (key: string) => (content: any) => {
    const eventPart = {}
    eventPart[key] = content
    this.setState({[key]: content})
  }
}

export default decorate(CreateEvent)
