import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  closeCreatePlaylist,
  closeExistingPlaylist,
  createEventPlaylist,
  editEventRequest,
  eventContentUpdated,
  eventImageUploaded,
  eventImageUploadError,
  eventSavingReset,
  initializeCreateForm,
  locationChanged,
  locationSelected,
  saveEvent,
  selectCreatePlaylist,
  selectExistingPlaylist,
  setStep
} from '../event/eventActions'
import {
  deselectPlaylist,
  setEventPlaylist
} from '../eventPlaylist/eventPlaylistActions'
import {
  acknowledgeEventInviteCopied,
  copyEventInvite
} from '../eventView/eventViewActions'
import { fetchPlaylists } from '../playlist/playlistActions'
import IRootState from '../rootState'
import { clearMessage } from '../shareEvent/shareActions'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.savingEvent,
  message: state.event.shareEventMessage,
  errors: state.event.errors,
  playlistInput: state.event.playlistInput,
  playlists: state.playlist.data,
  selectedPlaylist: state.eventPlaylist.playlist,
  isCreatingPlaylist: state.playlist.isCreating,
  copiedToClipboard: state.eventView.copiedToClipboard,
  searchResult: state.playlist.searchResult,
  currentStep: state.event.createEventStep
})

const mapDispatchToProps = (dispatch: any) => ({
  cancel: () => {
    dispatch(eventSavingReset())
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
      setEventPlaylist,
      deselectPlaylist,
      closeCreatePlaylist,
      closeExistingPlaylist,
      createEventPlaylist,
      eventContentUpdated,
      eventImageUploadError,
      eventImageUploaded,
      initializeCreateForm,
      locationChanged,
      locationSelected,
      saveEvent,
      selectCreatePlaylist,
      selectExistingPlaylist,
      fetchPlaylists,
      eventSavingReset,
      copyEventInvite,
      acknowledgeEventInviteCopied,
      editEventRequest,
      clearMessage,
      setStep,
    },
    dispatch
  )
})

const CreateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent)

export default CreateEventContainer
