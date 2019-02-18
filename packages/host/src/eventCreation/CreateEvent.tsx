import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import Grid from '@material-ui/core/Grid/Grid'
import { Theme, WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Switch from '@material-ui/core/Switch/Switch'
import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EventInput from '../components/EventInput/EventInput'
import LocationAutoComplete from '../components/location/LocationAutoComplete'
import MapComponent from '../components/MapComponent'
import EventSearchTracks from '../components/SearchTracks/EventSearchTracksContainer'
import IEvent from '../event/IEvent'
import IEventErrors from '../event/IEventErrors'
import IPlaylistInput from '../event/IPlaylistInput'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IPlaylistDetails from '../playlist/IPlaylistDetails'
import ISearch from '../playlist/ISearch'
import FileUpload from '../upload/FileUpload'
import IUser from '../user/IUser'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
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

interface ICreateEventProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  errors: IEventErrors
  playlistInput: IPlaylistInput
  playlists: IPlaylist[]
  copiedToClipboard: boolean
  message: string
  isCreatingPlaylist: boolean
  searchResult: ISearch
  selectedPlaylist: IPlaylist
  currentStep: number
  votes: Map<string, ITrackVoteStatus>
  sortPlaylistByVotesDescending(
    playlist: IPlaylist,
    votes: Map<string, ITrackVoteStatus>
  ): IAction
  fetchEventVotes(eventId: string): IAction
  deselectPlaylist(): IAction
  clearMessage(): IAction
  cancel(): void
  toggleDynamicVoting(event: IEvent): IAction
  toggleAutoAcceptSuggestions(event: IEvent): IAction
  toggleSuggestingPlaylists(event: IEvent): IAction
  createEventPlaylist(playlist: IPlaylistDetails): IAction
  eventContentUpdated(content: any): IAction
  eventImageUploadError(error: Error): IAction
  eventImageUploaded(url: string): IAction
  initializeCreateForm(event: IEvent, user: IUser): IAction
  locationChanged(address: string): IAction
  locationSelected(address: string): IAction
  editEventRequest(event: IEvent): IAction
  saveEvent(event: IEvent): IAction
  fetchPlaylists(user: IUser): IAction
  copyEventInvite(): IAction
  eventSavingReset(): IAction
  acknowledgeEventInviteCopied(): IAction
  setEventPlaylist(playlist: IPlaylist): IAction
  setStep(step: number): IAction
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
  getEventById(eventId: string): IAction
  deleteEvent(eventId: string): IAction
}

class CreateEvent extends React.PureComponent<ICreateEventProps & WithStyles> {
  public state = {
    showSaveDialog: true,
    showSaveErrorDialog: true,
    showRequiredDialog: true,
    showFinishCreatingEventDialog: true,
    showCreatePlaylistErrorDialog: true,
    name: '',
    description: '',
    organizer: '',
    genre: '',
  }

  public componentDidMount() {
    this.props.initializeCreateForm(this.props.event, this.props.user)

    const eventId = this.props.match.params.eventId

    const { event, getEventById } = this.props

    if (!event.eventId && eventId) {
      getEventById(eventId)
    }

    this.props.fetchEventVotes(eventId)
  }


  public componentWillUnmount() {
    this.props.deselectPlaylist()
    this.props.eventSavingReset()
  }

  public componentWillReceiveProps(newProps: ICreateEventProps) {
    if (this.state.organizer === '' && this.props.event.organizer !== '') {
      this.setState({
        organizer: this.props.event.organizer
      })
    }
    if (this.state.name !== newProps.event.name) {
      this.setState({
        name: newProps.event.name
      })
    }

    const eventId = this.props.match.params.eventId

    if (this.props.selectedPlaylist.id !== newProps.selectedPlaylist.id) {
      this.props.fetchEventVotes(eventId)
    }
  }

  public handleSetPlaylist = (playlist: IPlaylist) => {
    this.props.setEventPlaylist(playlist)
    if (this.props.event.name === '') {
      this.setState({
        name: playlist.name,
        description: playlist.description
      })
    }
  }

  public prevStep = () => {
    const { currentStep, setStep } = this.props
    if (currentStep !== 0) {
      setStep(currentStep - 1)
    }
  }

  public onDynamicChange = (key: string) => (content: any) => {
    const eventPart = {}
    eventPart[key] = content
    this.props.eventContentUpdated(eventPart)
  }

  public setChanges = () => {
    const decoratedState = _.omit(
      this.state,
      'currentStep',
      'showSaveDialog',
      'showRequiredDialog',
      'showFinishCreatingEventDialog',
      'showCreatePlaylistErrorDialog',
      'showSaveErrorDialog',
      'description'
      )
    if (this.props.currentStep === 0) {
      this.props.eventContentUpdated({genre: this.state.genre})
    } else {
      this.props.eventContentUpdated(decoratedState)
    }
  }

  public nextStep = () => {
    const {
      name,
      organizer,
    } = this.state

    const { currentStep } = this.props

    const location = this.props.event.location.address

    if (currentStep === 0 && !this.props.event.playlistUrl) {
      this.showRequiredDialog('Pick or create a playlist')
    } else if (currentStep === 1 && (!name || !organizer || !location )) {
      this.showRequiredDialog('Fill all required fields')
    } else {
      this.setChanges()
    }
  }

  public showCreateEventErrorDialog = () => {
    const message = this.props.errors.saving.response.statusText

    this.setState({ showSaveErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: message,
      type: 'error'
    })
  }

  public showCreatePlaylistErrorDialog = () => {
    this.setState({ showCreatePlaylistErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Playlist wasn`t created',
      type: 'error'
    }).then()
  }

  public showRequiredDialog = (message: string) => {
    this.setState({ showRequiredDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: 'Pick or create a playlist',
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

  public showConfirmationDialog = () => {
    SweetAlert.fire({
      title: 'Delete Event',
      text: `Are you sure?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffb000',
      cancelButtonColor: '#e0e0e0',
      confirmButtonText: 'Delete'
    }).then((result: any) => {
      if (result.value && this.props.event && this.props.event.eventId) {
        this.props.deleteEvent(this.props.event.eventId)
        this.props.history.push('/')
      }
    })
  }

  public pickStep = (step: number) => {
    const { currentStep, setStep } = this.props

    if (currentStep === 0 && !this.props.event.playlistUrl) {
      this.showRequiredDialog('Pick or create a playlist')
    } else if(step === 2 && this.props.event.createdAt === undefined) {
      this.showFinishCreatingEventDialog()
    } else {
      setStep(step)
      this.setChanges()
    }
  }

  public renderMap = (coords: any) => {
    return <MapComponent coords={coords} />
  }

  public handleDynamicVotingToggled = () => {
    const {
      event,
      toggleDynamicVoting,
      votes,
      selectedPlaylist,
      sortPlaylistByVotesDescending
    } = this.props
    toggleDynamicVoting(event)
    sortPlaylistByVotesDescending(selectedPlaylist, votes)
  }

  public autoAcceptSuggestionsToggled = () => {
    const { event, toggleAutoAcceptSuggestions } = this.props
    toggleAutoAcceptSuggestions(event)
  }

  public suggestingPlaylistsToggled = () => {
    const { event, toggleSuggestingPlaylists } = this.props
    toggleSuggestingPlaylists(event)
  }

  public renderFirstStep = () => {
    const {
      fetchPlaylists,
      user,
      playlistInput,
      playlists,
      isCreatingPlaylist,
      createEventPlaylist,
      errors,
      classes,
      searchResult,
      selectedPlaylist,
      deselectPlaylist,
      onPlaylistDragDrop,
      tryRemoveTrack,
      event,
      history
    } = this.props

    return (
      <React.Fragment>
        {errors.playlistCreation && this.showCreatePlaylistErrorDialog()}
        <Grid item={true} xs={12} sm={6}>
          <PlaylistSelection
            onPlaylistDragDrop={onPlaylistDragDrop}
            tryRemoveTrack={tryRemoveTrack}
            selectedPlaylist={selectedPlaylist}
            searchResult={searchResult}
            playlists={playlists}
            fetchPlaylists={fetchPlaylists}
            deselectPlaylist={deselectPlaylist}
            user={user}
            handleEventName={this.onDynamicChange('name')}
            onPlaylistAdded={this.onDynamicChange('playlistUrl')}
            handlePickGenre={this.handleContentUpdated('genre')}
            playlistInput={playlistInput}
            createEventPlaylist={createEventPlaylist}
            isCreatingPlaylist={isCreatingPlaylist}
            setEventPlaylist={this.handleSetPlaylist}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          {!_.isEmpty(selectedPlaylist) && (
              <React.Fragment>
                <span>Add tracks to playlist</span>
                <EventSearchTracks
                  playlist={selectedPlaylist}
                  layout={'column'}
                />
              </React.Fragment>
            )
          }
        </Grid>
        <div className="control-btn-row">
          {
            history.location.pathname === `/events/${event.eventId}/edit` && (
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.showConfirmationDialog}
              >
                <span className="control-btn-text-primary">Delete Event</span>
              </Button>
            )
          }
          <Button
            variant="contained"
            onClick={this.handleCancel}
            className={classes.button}
          >
            <span className="control-btn-text-primary">Cancel</span>
          </Button>
          <Button
            onClick={this.handleSaveEvent}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            <span className="control-btn-text-secondary">{!event.eventId ? 'Create Event' : 'Next'}</span>
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
      eventImageUploaded,
      eventImageUploadError,
      currentStep,
      history
    } = this.props

    const { organizer, showSaveDialog } = this.state

    if (currentStep === 1 && showSaveDialog) {
      this.showSavedDialogue()
    }
    return (
      <React.Fragment>
        <Grid item={true} xs={12} sm={6}>
          <EventInput
            label={'Event Name'}
            placeholder={'Provide a name for your event'}
            value={event.name}
            onChange={this.onDynamicChange('name')}
            error={!event.name}
            errorLabel={'Required'}
          />
          <EventInput
            label={'Event description'}
            maxRows={11}
            value={event.description}
            onChange={this.onDynamicChange('description')}
          />

          <Grid container={true} direction={'column'}>
            <span>Party modes</span>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <Switch
                    checked={event.settings.suggestingPlaylistsEnabled}
                    onChange={this.suggestingPlaylistsToggled}
                  />
                }
                label="Allow Playlist Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={event.settings.autoAcceptSuggestionsEnabled}
                    onChange={this.autoAcceptSuggestionsToggled}
                  />
                }
                label="Auto Accept Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={event.settings.dynamicVotingEnabled}
                    onChange={this.handleDynamicVotingToggled}
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
            onChange={this.handleContentUpdated('organizer')}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
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
          {
            history.location.pathname === `events/${event.eventId}/edit` && (
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.showConfirmationDialog}
              >
                <span className="control-btn-text-primary">Delete Event</span>
              </Button>
            )
          }
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
              Next
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
      copiedToClipboard,
      message,
      clearMessage,
    } = this.props

    return (
      <React.Fragment>
        <ShareEvent
          clearMessage={clearMessage}
          message={message}
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
        <CreateEventSteps pickStep={this.pickStep} step={this.props.currentStep} />
        <form className="CreateEvent-root" noValidate={true} autoComplete="off">
            {
              <div hidden={this.props.currentStep !== 0}>
                <Grid
                  container={true}
                  spacing={24}
                  direction="row"
                >
                  {this.renderFirstStep()}
                </Grid>
              </div>
            }
            {
              <div hidden={this.props.currentStep !== 1}>
                <Grid
                  container={true}
                  spacing={24}
                  direction="row"
                >
                  {this.renderSecondStep()}
                </Grid>
              </div>
            }
            {this.props.currentStep === 2 &&
              <Grid
                container={true}
                spacing={24}
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
    const {
      errors,
      event,
      editEventRequest,
      saveEvent,
      setStep,
      currentStep,
      history
    } = this.props
    this.nextStep()
    if ( !_.isEmpty(errors.saving) && history.location.pathname !== `/events/${event.eventId}/edit`) {
      this.showCreateEventErrorDialog()
    }
    if (event.createdAt !== undefined) {
      editEventRequest({
        ...event,
        dataUrl: ''
      })
      setStep(currentStep + 1)
    } else {
        saveEvent({
          ...event,
          organizer: this.state.organizer,
          dataUrl: ''
        })
    }
  }

  private handleContentUpdated = (key: string) => (content: any) => {
    const eventPart = {}
    eventPart[key] = content
    this.setState({[key]: content})
  }
}

export default decorate(CreateEvent)
