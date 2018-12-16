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
  selectExistingPlaylist
} from '../event/eventActions'
import {
  acknowledgeEventInviteCopied,
  copyEventInvite
} from '../eventView/eventViewActions'
import { fetchPlaylists } from '../playlist/playlistActions'
import IRootState from '../rootState'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.savingEvent,
  playlistInput: state.event.playlistInput,
  playlists: state.playlist.data,
  copiedToClipboard: state.eventView.copiedToClipboard
})

const mapDispatchToProps = (dispatch: any) => ({
  cancel: () => {
    dispatch(eventSavingReset())
    dispatch(push('/'))
  },
  ...bindActionCreators(
    {
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
    },
    dispatch
  )
})

const CreateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent)

export default CreateEventContainer
