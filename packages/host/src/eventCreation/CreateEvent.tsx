import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IEvent from '../event/IEvent'
import IEventErrors from '../event/IEventErrors'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import ISearch from '../playlist/ISearch'
import IUser from '../user/IUser'
import './CreateEvent.scss'
import CreateEventPlaylist from './CreateEventPlaylist'
import CreateEventSteps from './CreateEventSteps'
import ShareEvent from './ShareEvent'
import AddEventDetails from './AddEventDetails'

const SweetAlert = withReactContent(Swal) as any

interface ICreateEventProps extends RouteComponentProps<any> {
  acknowledgeEventInviteCopied(): IAction
  cancel(): void
  clearJustCreatedPlaylists(): IAction
  clearSavingEvent(): IAction
  copyEventInvite(): IAction
  deleteEvent(eventId: string): IAction
  deselectPlaylist(): IAction
  editEventRequest(event: IEvent): IAction
  errors: IEventErrors
  event: IEvent
  eventImageUploadError(error: Error): IAction
  eventImageUploaded(url: string): IAction
  eventSavingReset(): IAction
  fetchEventVotes(eventId: string): IAction
  fetchPlaylists(user: IUser): IAction
  getEventById(eventId: string): IAction
  getMoreUsersPlaylists(user: IUser, offset: number): IAction
  initializeCreateForm(event: IEvent, user: IUser): IAction
  isCreatingPlaylist: boolean
  locationChanged(address: string): IAction
  locationSelected(address: string): IAction
  onPlaylistDragDrop(
    playlist: IPlaylist,
    fromIndex: number,
    toIndex: number
  ): IAction
  playlists: IPlaylist[]
  saveEvent(event: IEvent): IAction
  searchResult: ISearch
  selectedPlaylist: IPlaylist
  tryRemoveTrack(playlistId: string, uri: string, position: number): IAction
  user: IUser
}

const CreateEvent = ({
  acknowledgeEventInviteCopied,
  cancel,
  clearJustCreatedPlaylists,
  clearSavingEvent,
  copyEventInvite,
  eventImageUploadError,
  deleteEvent,
  deselectPlaylist,
  editEventRequest,
  errors,
  event,
  eventSavingReset,
  fetchEventVotes,
  fetchPlaylists,
  getEventById,
  getMoreUsersPlaylists,
  history,
  initializeCreateForm,
  eventImageUploaded,
  match,
  onPlaylistDragDrop,
  playlists,
  saveEvent,
  tryRemoveTrack,
  user
}: ICreateEventProps) => {
  const eventId = match.params.eventId

  const [step, setStep] = useState(0)

  useEffect(() => {
    initializeCreateForm(event, user)
    clearJustCreatedPlaylists()

    if (!eventId) {
      clearSavingEvent()
      deselectPlaylist()
    }

    if (!event.eventId && eventId) {
      getEventById(eventId)
    }

    fetchEventVotes(eventId)
    return () => {
      deselectPlaylist()
      eventSavingReset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  const showErrorDialog = (message: string) => {
    SweetAlert.fire({
      confirmButtonColor: '#8f0a00',
      title: message,
      type: 'error'
    })
  }

  const showSavedDialogue = () => {
    SweetAlert.fire({
      confirmButtonColor: '#00838F',
      title: 'Event Saved!',
      type: 'success'
    })
  }

  const showConfirmationDialog = () => {
    SweetAlert.fire({
      title: 'Delete Event',
      text: `Are you sure?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffb000',
      cancelButtonColor: '#e0e0e0',
      confirmButtonText: 'Delete'
    }).then((result: any) => {
      if (result.value && event && event.eventId) {
        deleteEvent(event.eventId)
        history.push('/')
      }
    })
  }

  const shouldGoToNextStep = () => {
    const location = event.location.address

    if (step === 0 && !event.playlistUrl) {
      showErrorDialog('Pick or create a playlist')
      return false
    } else if (step === 1 && (!event.name || !event.organizer || !location)) {
      showErrorDialog('Fill all required fields')
      return false
    }
    return true
  }

  const handleSaveEvent = () => {
    if (
      !_.isEmpty(errors.saving) &&
      history.location.pathname !== `/events/${event.eventId}/edit`
    ) {
      showErrorDialog(errors.saving.response.statusText)
    }
    if (shouldGoToNextStep()) {
      if (step === 0 && !!event.playlistUrl) {
        if (!!event.createdAt) {
          editEventRequest({
            ...event,
            dataUrl: ''
          })
          setStep(step + 1)
        } else {
          saveEvent({
            ...event,
            organizer: event.organizer,
            dataUrl: ''
          })
        }
      } else if (step === 0 && !event.playlistUrl) {
        showErrorDialog('Pick or create a playlist')
      } else {
        editEventRequest({
          ...event,
          dataUrl: ''
        })
        setStep(step + 1)
      }
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const isEditing: boolean =
    history.location.pathname === `/events/${event.eventId}/edit`

  return (
    <React.Fragment>
      <CreateEventSteps step={step} />
      <form className="CreateEvent-root" noValidate={true} autoComplete="off">
        {step === 0 && (
          <div>
            <CreateEventPlaylist
              event={event}
              isEditing={isEditing}
              user={user}
              playlists={playlists}
              fetchPlaylists={fetchPlaylists}
              getMoreUsersPlaylists={getMoreUsersPlaylists}
              onPlaylistDragDrop={onPlaylistDragDrop}
              tryRemoveTrack={tryRemoveTrack}
              showConfirmationDialog={showConfirmationDialog}
              handleCancel={cancel}
              handleSaveEvent={handleSaveEvent}
            />
          </div>
        )}
        {step === 1 && (
          <div>
            if (currentStep === 1 && history.location.pathname ===
            '/create-event') {showSavedDialogue()}
            <AddEventDetails
              event={event}
              isEditing={isEditing}
              cancel={cancel}
              prevStep={prevStep}
              eventImageUploadError={eventImageUploadError}
              eventImageUploaded={eventImageUploaded}
              showConfirmationDialog={showConfirmationDialog}
              handleSaveEvent={handleSaveEvent}
            />
          </div>
        )}
        {step === 2 && (
          <ShareEvent
            acknowledgeEventInviteCopied={acknowledgeEventInviteCopied}
            copyEventInvite={copyEventInvite}
            event={event}
          />
        )}
      </form>
    </React.Fragment>
  )
}

export default CreateEvent
