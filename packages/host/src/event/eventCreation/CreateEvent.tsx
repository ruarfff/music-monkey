import React from 'react'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { RouteComponentProps } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IAction from 'IAction'
import EventInput from 'components/EventInput/EventInput'
import MapComponent from 'location/MapComponent'
import IEvent from 'event/IEvent'
import IEventErrors from 'event/IEventErrors'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistDetails from 'playlist/IPlaylistDetails'
import ISearch from 'playlist/ISearch'
import FileUpload from 'upload/FileUpload'
import IUser from 'user/IUser'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'
import CreateEventSteps from './CreateEventSteps'
import EventDateTimePicker from './EventDateTimePicker'
import ShareEvent from './ShareEvent'
import CreateEventPlaylist from './CreateEventPlaylist'
import './CreateEvent.scss'

const SweetAlert = withReactContent(Swal) as any

interface ICreateEventProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  errors: IEventErrors
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
  getMoreUsersPlaylists(user: IUser, offset: number): IAction
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
  clearSavingEvent(): IAction
  playlistInputChange(name: string): IAction
  clearJustCreatedPlaylists(): IAction
}

class CreateEvent extends React.PureComponent<ICreateEventProps> {
  public state = {
    showSaveDialog: true,
    showErrorDialog: true,
    name: '',
    description: '',
    organizer: this.props.event.organizer || '',
    genre: ''
  }

  public timer: any = debounce(
    (eventPart: any) => this.props.eventContentUpdated(eventPart),
    300
  )

  public componentDidMount() {
    this.props.initializeCreateForm(this.props.event, this.props.user)
    this.props.clearJustCreatedPlaylists()

    const eventId = this.props.match.params.eventId

    if (!eventId) {
      this.props.clearSavingEvent()
      this.props.deselectPlaylist()
    }

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
    const eventId = this.props.match.params.eventId

    if (!this.state.organizer && newProps.event.organizer) {
      this.setState({ organizer: newProps.event.organizer })
    }

    if (!this.state.genre && newProps.event.genre) {
      this.setState({ genre: newProps.event.genre })
    }

    if (
      (!this.state.name && newProps.event.name) ||
      this.state.name !== newProps.event.name
    ) {
      this.setState({ name: newProps.event.name })
    }

    if (!this.state.description && newProps.event.description) {
      this.setState({ description: newProps.event.description })
    }

    if (
      !isEmpty(this.props.selectedPlaylist) &&
      this.props.selectedPlaylist.id !== newProps.selectedPlaylist.id
    ) {
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

  public shouldGoToNextStep = () => {
    const { currentStep, event } = this.props

    const location = event.location.address

    if (currentStep === 0 && !event.playlistUrl) {
      this.showErrorDialog('Pick or create a playlist')
      return false
    } else if (
      currentStep === 1 &&
      (!event.name || !event.organizer || !location)
    ) {
      this.showErrorDialog('Fill all required fields')
      return false
    }
    return true
  }

  public showErrorDialog = (message: string) => {
    this.setState({ showErrorDialog: false })
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: message,
      type: 'error'
    }).then(() => this.setState({ showErrorDialog: true }))
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
    const { setStep } = this.props
    const shouldGoNext = this.shouldGoToNextStep()
    if (shouldGoNext) {
      this.handleSaveEvent()
      setStep(step)
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

  public renderSecondStep = () => {
    const {
      event,
      eventImageUploaded,
      eventImageUploadError,
      currentStep,
      history
    } = this.props

    const { organizer, showSaveDialog, name, description } = this.state

    if (
      currentStep === 1 &&
      showSaveDialog &&
      history.location.pathname === '/create-event'
    ) {
      this.showSavedDialogue()
    }
    return (
      <React.Fragment>
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
            value={description}
            onChange={this.handleContentUpdated('description')}
          />

          <Grid container={true} direction={'column'}>
            <span>Party modes</span>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <Switch
                    value={'suggesting Playlists Enabled'}
                    checked={event.settings.suggestingPlaylistsEnabled}
                    onChange={this.suggestingPlaylistsToggled}
                  />
                }
                label="Allow Playlist Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    value={'auto Accept Suggestions Enabled'}
                    checked={event.settings.autoAcceptSuggestionsEnabled}
                    onChange={this.autoAcceptSuggestionsToggled}
                  />
                }
                label="Auto Accept Suggestions"
              />
              <FormControlLabel
                control={
                  <Switch
                    value={'dynamic Voting Enabled'}
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
            width={300}
            height={300}
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
        
        {event.location && this.renderMap(event.location.latLng)}

        <Grid item={true} xs={12} sm={6}>
          <EventDateTimePicker
            disablePast={true}
            value={event.startDateTime}
            onChange={this.handleContentUpdated('startDateTime')}
            label={'Starting At'}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <EventDateTimePicker
            disablePast={true}
            value={event.endDateTime}
            onChange={this.handleContentUpdated('endDateTime')}
            label={'Finishing At'}
          />
        </Grid>

        <div className="control-btn-row">
          {history.location.pathname === `events/${event.eventId}/edit` && (
            <Button variant="contained" onClick={this.showConfirmationDialog}>
              <span className="control-btn-text-primary">Delete Event</span>
            </Button>
          )}
          <Button
            variant="contained"
            color="default"
            onClick={this.handleCancel}
          >
            <span className="control-btn-text-primary">Cancel</span>
          </Button>
          <Button variant="contained" color="default" onClick={this.prevStep}>
            <span className="control-btn-text-primary">Prev</span>
          </Button>
          <Button
            disabled={!event.startDateTime || !event.endDateTime}
            variant="contained"
            color="secondary"
            onClick={this.handleSaveEvent}
          >
            <span className="control-btn-text-secondary">Next</span>
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
      clearMessage
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
    const {
      isCreatingPlaylist,
      history,
      event,
      currentStep,
      errors,
      user,
      playlists,
      searchResult,
      selectedPlaylist,
      deselectPlaylist,
      createEventPlaylist,
      fetchPlaylists,
      getMoreUsersPlaylists,
      onPlaylistDragDrop,
      tryRemoveTrack
    } = this.props
    const isEditing: boolean =
      history.location.pathname === `/events/${event.eventId}/edit`

    return (
      <React.Fragment>
        <CreateEventSteps pickStep={this.pickStep} step={currentStep} />
        <form className="CreateEvent-root" noValidate={true} autoComplete="off">
          {
            <div hidden={this.props.currentStep !== 0}>
              {errors.playlistCreation &&
                this.showErrorDialog("Playlist wasn't created")}
              <CreateEventPlaylist
                event={event}
                isEditing={isEditing}
                user={user}
                playlists={playlists}
                isCreatingPlaylist={isCreatingPlaylist}
                searchResult={searchResult}
                selectedPlaylist={selectedPlaylist}
                deselectPlaylist={deselectPlaylist}
                createEventPlaylist={createEventPlaylist}
                fetchPlaylists={fetchPlaylists}
                getMoreUsersPlaylists={getMoreUsersPlaylists}
                onPlaylistDragDrop={onPlaylistDragDrop}
                tryRemoveTrack={tryRemoveTrack}
                handleEventName={this.handlePlaylistInputChange}
                onPlaylistAdded={this.handleContentUpdated('playlistUrl')}
                handlePickGenre={this.handleContentUpdated('genre')}
                setEventPlaylist={this.handleSetPlaylist}
                showConfirmationDialog={this.showConfirmationDialog}
                handleCancel={this.handleCancel}
                handleSaveEvent={this.handleSaveEvent}
              />
            </div>
          }
          {
            <div hidden={currentStep !== 1}>
              <Grid container={true} spacing={3} direction="row">
                {this.renderSecondStep()}
              </Grid>
            </div>
          }
          {this.props.currentStep === 2 && (
            <Grid container={true} spacing={3} direction="row">
              {this.renderThirdStep()}
            </Grid>
          )}
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
    if (
      !isEmpty(errors.saving) &&
      history.location.pathname !== `/events/${event.eventId}/edit`
    ) {
      this.showErrorDialog(this.props.errors.saving.response.statusText)
    }
    if (this.shouldGoToNextStep()) {
      if (currentStep === 0 && !!event.playlistUrl) {
        if (!!event.createdAt) {
          editEventRequest({
            ...event,
            dataUrl: ''
          })
          setStep(currentStep + 1)
        } else {
          saveEvent({
            ...event,
            organizer: event.organizer,
            dataUrl: ''
          })
        }
      } else if (currentStep === 0 && !event.playlistUrl) {
        this.showErrorDialog('Pick or create a playlist')
      } else {
        editEventRequest({
          ...event,
          dataUrl: ''
        })
        setStep(currentStep + 1)
      }
    }
  }

  private handlePlaylistInputChange = (content: any) => {
    const { history, event, playlistInputChange } = this.props
    if (history.location.pathname === '/create-event' && !event.createdAt) {
      this.setState({ name: content })
      this.timer({ name: content })
    } else {
      debounce((name: any) => playlistInputChange(name), 300)(content)
    }
  }

  private handleContentUpdated = (key: string) => (content: any) => {
    const eventPart = {}
    eventPart[key] = content
    this.setState({ [key]: content })
    this.timer(eventPart)
  }
}

export default CreateEvent
